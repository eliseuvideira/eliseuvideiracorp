import { HttpError, isHttpError } from '../src/index';

describe('HttpError', () => {
  it('is an instance of Error', () => {
    expect.assertions(1);

    const error = new HttpError(400, 'Bad request');

    expect(error).toBeInstanceOf(Error);
  });

  it('has an status property', () => {
    expect.assertions(1);

    const STATUS = 404;

    const error = new HttpError(STATUS, 'Not found');

    expect(error.status).toBe(STATUS);
  });
});

describe('isHttpError', () => {
  it('identifies true HttpError instances', () => {
    expect.assertions(2);

    const httpError = new HttpError(500, 'Internal server error');

    expect(isHttpError(httpError)).toBe(true);

    const error: any = new Error('Bad request');

    error.status = 400;

    expect(isHttpError(error)).toBe(true);
  });

  it('identifies false HttpError instances', () => {
    const items: any[] = [
      0,
      -0,
      null,
      undefined,
      (x: unknown) => x,
      {},
      [],
      NaN,
      'error',
      true,
      new Error('Uncaught TypeError: undefined is not a function'),
      { message: 'Forbidden' },
      { status: 403 },
    ];

    expect.assertions(items.length);

    items.forEach((item) => expect(isHttpError(item)).toBe(false));
  });
});
