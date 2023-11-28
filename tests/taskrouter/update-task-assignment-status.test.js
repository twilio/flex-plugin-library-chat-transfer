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

const mockChannelSid = 'CSxxxxx';
describe('Update task assignment Status', () => {
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
    global.Runtime._addFunction('helpers/parameter-validator', './functions/helpers/parameter-validator.private.js');
    global.Runtime._addFunction('twilio-wrappers/taskrouter', './functions/twilio-wrappers/taskrouter.private.js');
  });

  it('getQueues is called successfully ', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateTask: jest.fn(() =>
          Promise.resolve({
            status: 200,
            task: {
              sid: 'TSxxxxxx',
              attributes: '{}',
            },
            success: true,
          }),
        ),
      };
    });
    const updateTask = require('../../functions/taskrouter/update-task-assignment-status');
    const handlerFn = updateTask.handler;
    const mockContext = {
      PATH: 'mockPath',
      getTwilioClient: () => () => jest.fn(),
    };
    const mockEvent = {
      taskSid: 'CHxxxxx',
      assignmentStatus: {
        updateAssignemt: 'AUxxxx',
      },
    };

    const mockResponse = new Twilio.Response();
    const mockErrorObject = jest.fn(() => Promise.resolve());
    const mockCallSid = '';
    const mockCallbackObject = (_err, response) => {
      expect(response).toBeInstanceOf(Twilio.Response);
      expect(response._statusCode).toEqual(500);
    //   expect(response._body.callSid).toBe(mockCallSid);
    };
    await handlerFn(mockContext, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
  });

  it('get-worker-channel error handler is called', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateTask: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const updateTask = require('../../functions/taskrouter/update-task-assignment-status');
    const handlerFn = updateTask.handler;
    const mockResponse = new Twilio.Response();
    const mockCallbackObject = jest.fn();
    const mockContext = {
      PATH: 'mockPath',
      getTwilioClient: () => () => jest.fn(),
    };
    const mockErrorObject = jest.fn();
    await handlerFn(mockContext, {}, mockCallbackObject, mockResponse, mockErrorObject);
    expect(mockErrorObject.mock.calls.length).toBe(0);
  });
});
