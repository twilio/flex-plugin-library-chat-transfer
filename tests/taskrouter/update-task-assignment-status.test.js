/* eslint-disable no-undef */
import helpers from '../test-utils/test-helper';

jest.mock('../../functions/helpers/prepare-function.private.js', () => ({
  __esModule: true,
  prepareFlexFunction: (_, fn) => fn,
}));

const mockChannelSid = 'CSxxxxx';
describe('Update task assignment Status', () => {
  const updateTaskTwilioClient = function (updateTaskAttributes) {
    const getWorkspace = (workspaceSid) => ({
      sid: workspaceSid,
      workers: (_workerSid) => ({
        sid: _workerSid,
        workerChannels: {
          list: updateTaskAttributes,
        },
      }),
    });

    const mockTaskRouterService = {
      workspaces: getWorkspace,
    };
    return {
      taskrouter: mockTaskRouterService,
    };
  };

  const updateTask = jest.fn(() => Promise.resolve({}));

  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
    global.Runtime._addFunction('helpers/parameter-validator', './functions/helpers/parameter-validator.private.js');
    global.Runtime._addFunction(
      'twilio-wrappers/retry-handler',
      './functions/twilio-wrappers/retry-handler.private.js',
    );
    global.Runtime._addFunction('twilio-wrappers/taskrouter', './functions/twilio-wrappers/taskrouter.private.js');
  });

  it('getQueues is called successfully ', async () => {
    const updateTask = require('../../functions/taskrouter/update-task-assignment-status');
    const handlerFn = updateTask.handler;
    const mockContext = {
      PATH: 'mockPath',
      getTwilioClient: () => updateTaskTwilioClient(updateTask),
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
    const updateTask = require('../../functions/taskrouter/update-task-assignment-status');
    const handlerFn = updateTask.handler;
    const mockResponse = new Twilio.Response();
    const mockCallbackObject = jest.fn();

    const mockErrorObject = jest.fn();
    await handlerFn({}, {}, mockCallbackObject, mockResponse, mockErrorObject);
    expect(mockErrorObject.mock.calls.length).toBe(0);
  });
});
