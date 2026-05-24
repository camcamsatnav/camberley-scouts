import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePost } from './usePost';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const HTTP_OK = 200;
const HTTP_TOO_MANY_REQUESTS = 429;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const RESPONSE_ID = 1;

const mockResponse = (status: number, body: unknown, ok = true) =>
  ({
    ok,
    status,
    text: () =>
      Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
    json: () => Promise.resolve(body),
  }) as Response;

const requestBody = { name: 'Jane', message: 'Hello' };

describe('usePost', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('returns a post function initially', () => {
    const { result } = renderHook(() => usePost());

    expect(result.current.post).toBeTypeOf('function');
  });

  it('returns undefined data initially', () => {
    const { result } = renderHook(() => usePost());

    expect(result.current.data).toBeUndefined();
  });

  it('returns loading false initially', () => {
    const { result } = renderHook(() => usePost());

    expect(result.current.loading).toBe(false);
  });

  it('sets loading to true while the request is in flight', () => {
    mockFetch.mockReturnValue(new Promise<Response>(() => {}));

    const { result } = renderHook(() => usePost());

    act(() => {
      result.current.post('/test', requestBody);
    });

    expect(result.current.loading).toBe(true);
  });

  it('sets loading to false after the request completes', async () => {
    mockFetch.mockResolvedValue(mockResponse(HTTP_OK, { ok: true }));

    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/test', requestBody);
    });

    expect(result.current.loading).toBe(false);
  });

  it('calls fetch with the default endpoint and request options', async () => {
    mockFetch.mockResolvedValue(mockResponse(HTTP_OK, { ok: true }));
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/v1/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  });

  it('sets data to the response body on a successful request', async () => {
    const responseBody = { id: RESPONSE_ID, status: 'sent' };
    mockFetch.mockResolvedValue(mockResponse(HTTP_OK, responseBody));
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody);
    });

    expect(result.current.data).toEqual(responseBody);
  });

  it('returns the response body on a successful request', async () => {
    const responseBody = { id: RESPONSE_ID, status: 'sent' };
    mockFetch.mockResolvedValue(mockResponse(HTTP_OK, responseBody));
    const { result } = renderHook(() => usePost());

    let returned: unknown;
    await act(async () => {
      returned = await result.current.post('/contact', requestBody);
    });

    expect(returned).toEqual(responseBody);
  });

  it('throws an HttpError for a non-ok response', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(HTTP_TOO_MANY_REQUESTS, 'Too Many Requests', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await expect(
        result.current.post('/contact', requestBody),
      ).rejects.toThrow('Request failed with status 429');
    });
  });

  it('includes the response status on a non-ok response error', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(HTTP_TOO_MANY_REQUESTS, 'Too Many Requests', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await expect(
        result.current.post('/contact', requestBody),
      ).rejects.toMatchObject({ status: HTTP_TOO_MANY_REQUESTS });
    });
  });

  it('includes the response body on a non-ok response error', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(HTTP_TOO_MANY_REQUESTS, 'Too Many Requests', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await expect(
        result.current.post('/contact', requestBody),
      ).rejects.toMatchObject({ body: 'Too Many Requests' });
    });
  });

  it('sets loading to false when the request fails', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(HTTP_INTERNAL_SERVER_ERROR, 'Internal Server Error', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody).catch(() => {});
    });

    expect(result.current.loading).toBe(false);
  });

  it('does not update data when the request fails', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(HTTP_INTERNAL_SERVER_ERROR, 'Internal Server Error', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody).catch(() => {});
    });

    expect(result.current.data).toBeUndefined();
  });
});
