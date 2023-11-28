jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  TaskRouterUtils: jest.fn(),
}));

import { TaskRouterUtils } from '@twilio/flex-plugins-library-utils';

describe('taskrouter.getWorkerChannels', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getWorkerChannels gives success', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        getWorkerChannels: jest.fn(() =>
          Promise.resolve({
            status: 200,
            workerChannels: {},
            success: true,
          }),
        ),
      };
    });
    const { getWorkerChannels } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      workerSid: '123',
    };

    const task = await getWorkerChannels({ ...payload });

    expect(task).toEqual({
      success: true,
      workerChannels: {},
      status: 200,
    });
  });

  it('getWorkerChannels gives error', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        getWorkerChannels: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { getWorkerChannels } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      workerSid: '123',
    };

    const errTask = await getWorkerChannels({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('taskrouter.updateWorkerChannel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updateWorkerChannel gives success', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateWorkerChannel: jest.fn(() =>
          Promise.resolve({
            status: 200,
            workerChannelCapacity: {},
            success: true,
          }),
        ),
      };
    });
    const { updateWorkerChannel } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      workerSid: '123',
    };

    const task = await updateWorkerChannel({ ...payload });

    expect(task).toEqual({
      success: true,
      workerChannelCapacity: {},
      status: 200,
    });
  });

  it('updateWorkerChannel gives error', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateWorkerChannel: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { updateWorkerChannel } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      workerSid: '123',
    };

    const errTask = await updateWorkerChannel({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});





describe('taskrouter.getQueues', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getQueues gives success', async () => {
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
    const { getQueues } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
    };

    const task = await getQueues({ ...payload });

    expect(task).toEqual({
      success: true,
      queues: {},
      status: 200,
    });
  });

  it('getQueues gives error', async () => {
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
    const { getQueues } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
    };

    const errTask = await getQueues({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('taskrouter.updateTaskAttributes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('updateTaskAttributes gives success', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateTaskAttributes: jest.fn(() =>
          Promise.resolve({
            status: 200,
            task: {
              attributes: '{ "attr1": "mockValue", "attr2": "mockValue" }',
            },
            success: true,
          }),
        ),
      };
    });
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');
    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      attributesUpdate: { attr1: 'mockValue', attr2: 'mockValue' },
      taskSid: 'TSxxxxxx',
      attempts: 0,
    };

    const task = await updateTaskAttributes({ ...payload });

    expect(task).toEqual({
      success: true,
      status: 200,
      task: { attributes: { attr1: 'mockValue', attr2: 'mockValue' } },
    });
  });

  it('updateTaskAttributes gives error', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateTaskAttributes: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');
    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      attributesUpdate: '{}',
      taskSid: 'TSxxxxxx',
      attempts: '0',
    };

    const errTask = await updateTaskAttributes({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('taskrouter.updateTask', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('updateTask gives success', async () => {
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
    const { updateTask } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      taskSid: 'TSxxxxxx',
      updateParams: {},
      attempts: 0,
    };

    const task = await updateTask({ ...payload });

    expect(task).toEqual({
      success: true,
      status: 200,
      task: { sid: 'TSxxxxxx', attributes: {} },
    });
  });

  it('updateTask gives error', async () => {
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
    const { updateTask } = require('../../functions/twilio-wrappers/taskrouter.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      taskSid: 'TSxxxxxx',
      updateParams: {},
      attempts: '0',
    };
    const errTask = await updateTask({ ...payload });
    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});
