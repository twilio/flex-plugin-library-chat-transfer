import helpers from '../test-utils/test-helper';

jest.mock('../../functions/helpers/prepare-function.private.js', () => ({
  __esModule: true,
  prepareFlexFunction: (_, fn) => fn,
}));
jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  TaskRouterUtils: jest.fn(),
}));

import { TaskRouterUtils } from '@twilio/flex-plugins-library-utils';

describe('get-queues', () => {
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
    global.Runtime._addFunction('helpers/parameter-validator', './functions/helpers/parameter-validator.private.js');
    global.Runtime._addFunction('twilio-wrappers/taskrouter', './functions/twilio-wrappers/taskrouter.private.js');
  });

  it('getQueues is called successfully ', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        getAllQueues: jest.fn(() =>
          Promise.resolve({
            status: 200,
            taskQueueList: {},
            success: true,
          }),
        ),
      };
    });
    const GetQueues = require('../../functions/taskrouter/get-queues');
    const handlerFn = GetQueues.handler;

    const mockContext = {
      PATH: 'mockPath',
      getTwilioClient: ()=> () => jest.fn(),
    };
    const mockEvent = {
      channelSid: 'CHxxxxx',
      attributes: {},
    };

    const mockResponse = new Twilio.Response();
    const mockErrorObject = jest.fn(() => Promise.resolve());

    const mockCallbackObject = (_err, response) => {
      expect(response).toBeInstanceOf(Twilio.Response);
      expect(response._statusCode).toEqual(200);
      expect(response._body.callSid).toBe(mockCallSid);
    };
    await handlerFn(mockContext, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
  });

  it('getQueues error handler is called', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        getAllQueues: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const GetQueues = require('../../functions/taskrouter/get-queues');
    const handlerFn = GetQueues.handler;
    const mockEvent = {
      channelSid: 'CHxxxxx',
      attributes: {},
    };

    const mockResponse = new Twilio.Response();
    const mockCallbackObject = jest.fn();
    const mockErrorObject = jest.fn();
    await handlerFn({}, {}, mockCallbackObject, mockResponse, mockErrorObject);
    expect(mockErrorObject.mock.calls.length).toBe(1);
  });
});
