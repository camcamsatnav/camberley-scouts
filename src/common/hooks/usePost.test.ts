import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePost } from './usePost';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

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
      resolveResponse(mockResponse(200, { ok: true }));
    });
    expect(result.current.loading).toBe(false);
  });

  it('should call fetch with the correct URL, method, headers, and body', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:3000/api/v1');
    mockFetch.mockResolvedValue(mockResponse(200, { ok: true }));
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody);
    });

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      },
    );

    vi.unstubAllEnvs();
  });

  it('should set data and return the response body on a successful request', async () => {
    const responseBody = { id: 1, status: 'sent' };
    mockFetch.mockResolvedValue(mockResponse(200, responseBody));
    const { result } = renderHook(() => usePost());

    let returned: unknown;
    await act(async () => {
      returned = await result.current.post('/contact', requestBody);
    });

    expect(result.current.data).toEqual(responseBody);
    expect(returned).toEqual(responseBody);
  });

  it('should throw an HttpError with the correct status and body on a non-ok response', async () => {
    mockFetch.mockResolvedValue(mockResponse(429, 'Too Many Requests', false));
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await expect(
        result.current.post('/contact', requestBody),
      ).rejects.toMatchObject({
        status: 429,
        body: 'Too Many Requests',
      });
    });
  });

  it('should set loading to false even when the request fails', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(500, 'Internal Server Error', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody).catch(() => {});
    });

    expect(result.current.loading).toBe(false);
  });

  it('should not update data when the request fails', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(500, 'Internal Server Error', false),
    );
    const { result } = renderHook(() => usePost());

    await act(async () => {
      await result.current.post('/contact', requestBody).catch(() => {});
    });

    expect(result.current.data).toBeUndefined();
  });
});
