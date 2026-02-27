import { expect, it } from 'vitest';
import { HttpError } from './HttpError';

it('should set the correct message', () => {
  const error = new HttpError(404, 'Not Found');

  expect(error.message).toBe('Request failed with status 404');
});

it('should set the correct name', () => {
  const error = new HttpError(404, 'Not Found');

  expect(error.name).toBe('HttpError');
});

it('should set the correct status', () => {
  const error = new HttpError(404, 'Not Found');

  expect(error.status).toBe(404);
});

it('should set the correct body', () => {
  const error = new HttpError(404, 'Not Found');

  expect(error.body).toBe('Not Found');
});

it('should be an instance of Error', () => {
  const error = new HttpError(500, 'Internal Server Error');

  expect(error).toBeInstanceOf(Error);
});

it('should be an instance of HttpError', () => {
  const error = new HttpError(500, 'Internal Server Error');

  expect(error).toBeInstanceOf(HttpError);
});
