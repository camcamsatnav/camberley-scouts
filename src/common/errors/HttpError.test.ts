import { describe, expect, it } from 'vitest';
import { HttpError } from './HttpError';

const NOT_FOUND_STATUS = 404;
const SERVER_ERROR_STATUS = 500;

describe('HttpError', () => {
  it('sets the error message from the status', () => {
    const error = new HttpError(NOT_FOUND_STATUS, 'Not Found');

    expect(error.message).toBe('Request failed with status 404');
  });

  it('sets the error name', () => {
    const error = new HttpError(NOT_FOUND_STATUS, 'Not Found');

    expect(error.name).toBe('HttpError');
  });

  it('sets the response status', () => {
    const error = new HttpError(NOT_FOUND_STATUS, 'Not Found');

    expect(error.status).toBe(NOT_FOUND_STATUS);
  });

  it('sets the response body', () => {
    const error = new HttpError(NOT_FOUND_STATUS, 'Not Found');

    expect(error.body).toBe('Not Found');
  });

  it('extends Error', () => {
    const error = new HttpError(SERVER_ERROR_STATUS, 'Internal Server Error');

    expect(error).toBeInstanceOf(Error);
  });

  it('is an instance of HttpError', () => {
    const error = new HttpError(SERVER_ERROR_STATUS, 'Internal Server Error');

    expect(error).toBeInstanceOf(HttpError);
  });
});
