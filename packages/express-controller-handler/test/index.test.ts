import { controller } from '../src/index';

describe('express-plugin-controller', () => {
  it('catches errors and call the next callback', async () => {
    expect.assertions(2);
    const error = new Error('Invalid');

    const controllerInstance = controller(async () => Promise.reject(error));

    const nextCallback = jest.fn();

    await controllerInstance(null as any, null as any, nextCallback);

    expect(nextCallback).toHaveBeenCalledTimes(1);
    expect(nextCallback).toHaveBeenCalledWith(error);
  });

  it("doesn't call next callback when there's no errors", async () => {
    expect.assertions(2);

    const nextCallback = jest.fn();
    const controllerTask = jest.fn();

    const controllerInstance = controller(async () => {
      controllerTask();
      await Promise.resolve();
    });

    await controllerInstance(null as any, null as any, nextCallback);

    expect(nextCallback).not.toHaveBeenCalled();
    expect(controllerTask).toHaveBeenCalledTimes(1);
  });
});
