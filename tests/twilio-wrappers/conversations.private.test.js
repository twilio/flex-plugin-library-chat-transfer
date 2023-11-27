jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  ConversationsUtils: jest.fn(),
}));

import { ConversationsUtils } from '@twilio/flex-plugins-library-utils';

describe('Conversations.getConversation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getConversation gives success', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        getConversation: jest.fn(() =>
          Promise.resolve({
            status: 200,
            conversation: {},
            success: true,
          }),
        ),
      };
    });
    const { getConversation } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
    };

    const task = await getConversation({ ...payload });

    expect(task).toEqual({
      success: true,
      conversation: {},
      status: 200,
    });
  });

  it('getConversation gives error', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        getConversation: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { getConversation } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
    };

    const errTask = await getConversation({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('Conversations.participantList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('participantList gives success', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        getConversationParticipantList: jest.fn(() =>
          Promise.resolve({
            status: 200,
            participants: {},
            success: true,
          }),
        ),
      };
    });
    const { participantList } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      limit: 1000,
    };

    const task = await participantList({ ...payload });

    expect(task).toEqual({
      success: true,
      participants: {},
      status: 200,
    });
  });

  it('participantList gives error', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        getConversationParticipantList: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { participantList } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      limit: 1000,
    };

    const errTask = await participantList({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('Conversations.updateAttributes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updateAttributes gives success', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        updateConversationAttributes: jest.fn(() =>
          Promise.resolve({
            status: 200,
            conversation: {},
            success: true,
          }),
        ),
      };
    });
    const { updateAttributes } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      attributes: '{}',
    };

    const task = await updateAttributes({ ...payload });

    expect(task).toEqual({
      success: true,
      conversation: {},
      status: 200,
    });
  });

  it('updateAttributes gives error', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        updateConversationAttributes: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { updateAttributes } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      attributes: '{}',
    };

    const errTask = await updateAttributes({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('Conversations.addWebhook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('addWebhook gives success', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        addWebhook: jest.fn(() =>
          Promise.resolve({
            status: 200,
            webhook: {},
            success: true,
          }),
        ),
      };
    });
    const { addWebhook } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      method: '{}',
      filters: [],
      url: '',
      target: '',
    };

    const task = await addWebhook({ ...payload });

    expect(task).toEqual({
      success: true,
      webhook: {},
      status: 200,
    });
  });

  it('addWebhook gives error', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        addWebhook: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { addWebhook } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      method: '{}',
      filters: [],
      url: '',
      target: '',
    };

    const errTask = await addWebhook({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('Conversations.removeWebhook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removeWebhook gives success', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        removeWebhook: jest.fn(() =>
          Promise.resolve({
            status: 200,
            webhook: {},
            success: true,
          }),
        ),
      };
    });
    const { removeWebhook } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      webhookSid: '',
    };

    const task = await removeWebhook({ ...payload });

    expect(task).toEqual({
      success: true,
      webhook: {},
      status: 200,
    });
  });

  it('removeWebhook gives error', async () => {
    ConversationsUtils.mockImplementation((value) => {
      return {
        removeWebhook: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { removeWebhook } = require('../../functions/twilio-wrappers/conversations.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      conversationSid: 'Cxxx',
      webhookSid: '',
    };

    const errTask = await removeWebhook({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});
