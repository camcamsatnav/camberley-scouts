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

  it('should return post function, undefined data, and loading false initially', () => {
    const { result } = renderHook(() => usePost());

    expect(result.current.post).toBeTypeOf('function');
    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });

  it('should set loading to true while the request is in flight and false after', async () => {
    let resolveResponse!: (value: Response) => void;
    mockFetch.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveResponse = resolve;
      }),
    );

    const { result } = renderHook(() => usePost());

    act(() => {
      result.current.post('/test', requestBody);
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveResponse(mockResponse(HTTP_OK, { ok: true }));
    });
    expect(result.current.loading).toBe(false);
  });

  it('should call fetch with the correct URL, method, headers, and body', async () => {
    mockFetch.mockResolvedValue(mockResponse(HTTP_OK, { ok: true }));
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody);
    });

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  });

  it('should set data and return the response body on a successful request', async () => {
    const responseBody = { id: RESPONSE_ID, status: 'sent' };
    mockFetch.mockResolvedValue(mockResponse(HTTP_OK, responseBody));
    const { result } = renderHook(() => usePost());

    let returned: unknown;
    await act(async () => {
      returned = await result.current.post('/contact', requestBody);
    });

    expect(result.current.data).toEqual(responseBody);
    expect(returned).toEqual(responseBody);
  });

  it('should throw an HttpError with the correct status and body on a non-ok response', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(HTTP_TOO_MANY_REQUESTS, 'Too Many Requests', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await expect(
        result.current.post('/contact', requestBody),
      ).rejects.toMatchObject({
        status: HTTP_TOO_MANY_REQUESTS,
        body: 'Too Many Requests',
      });
    });
  });

  it('should set loading to false even when the request fails', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(HTTP_INTERNAL_SERVER_ERROR, 'Internal Server Error', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody).catch(() => {});
    });

    expect(result.current.loading).toBe(false);
  });

  it('should not update data when the request fails', async () => {
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
