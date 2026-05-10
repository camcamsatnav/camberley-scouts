import { useState } from 'react';
import { clientEnv } from '../config/env';
import { HttpError } from '../errors/HttpError';

interface UsePostResult<T, B> {
  post: (path: string, body: B) => Promise<T>;
  data: T | undefined;
  loading: boolean;
}

export const usePost = <T, B extends object>(): UsePostResult<T, B> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const post = async (path: string, body: B): Promise<T> => {
    const apiBaseUrl = clientEnv.VITE_API_BASE_URL;
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new HttpError(response.status, errorBody);
      }

      const result = (await response.json()) as T;
      setData(result);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading };
};
