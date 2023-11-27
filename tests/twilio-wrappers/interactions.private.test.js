jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  InteractionUtils: jest.fn(),
}));

import { InteractionUtils } from '@twilio/flex-plugins-library-utils';

describe('Interactions.participantCreateInvite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('participantCreateInvite gives success', async () => {
    InteractionUtils.mockImplementation((value) => {
      return {
        participantCreateInvite: jest.fn(() =>
          Promise.resolve({
            status: 200,
            participantInvite: {},
            success: true,
          }),
        ),
      };
    });
    const { participantCreateInvite } = require('../../functions/twilio-wrappers/interactions.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      interactionSid: 'Ixxx',
      channelSid: 'Cxxxx',
      routing: {},
    };

    const task = await participantCreateInvite({ ...payload });

    expect(task).toEqual({
      success: true,
      participantInvite: {},
      status: 200,
    });
  });

  it('participantCreateInvite gives error', async () => {
    InteractionUtils.mockImplementation((value) => {
      return {
        participantCreateInvite: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { participantCreateInvite } = require('../../functions/twilio-wrappers/interactions.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      interactionSid: 'Ixxx',
      channelSid: 'Cxxxx',
      routing: {},
    };

    const errTask = await participantCreateInvite({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('Interactions.participantUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('participantUpdate gives success', async () => {
    InteractionUtils.mockImplementation((value) => {
      return {
        participantUpdate: jest.fn(() =>
          Promise.resolve({
            status: 200,
            updatedParticipant: {},
            success: true,
          }),
        ),
      };
    });
    const { participantUpdate } = require('../../functions/twilio-wrappers/interactions.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      interactionSid: 'Ixxx',
      channelSid: 'Cxxxx',
      participantSid: 'Pxxxx',
      status: 'Mock',
    };

    const task = await participantUpdate({ ...payload });

    expect(task).toEqual({
      success: true,
      updatedParticipant: {},
      status: 200,
    });
  });

  it('participantUpdate gives error', async () => {
    InteractionUtils.mockImplementation((value) => {
      return {
        participantUpdate: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { participantUpdate } = require('../../functions/twilio-wrappers/interactions.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      interactionSid: 'Ixxx',
      channelSid: 'Cxxxx',
      participantSid: 'Pxxxx',
      status: 'Mock',
    };

    const errTask = await participantUpdate({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('Interactions.channelUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('channelUpdate gives success', async () => {
    InteractionUtils.mockImplementation((value) => {
      return {
        channelUpdate: jest.fn(() =>
          Promise.resolve({
            status: 200,
            updatedChannel: {},
            success: true,
          }),
        ),
      };
    });
    const { channelUpdate } = require('../../functions/twilio-wrappers/interactions.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      interactionSid: 'Ixxx',
      channelSid: 'Cxxxx',
      status: 'Mock',
    };

    const task = await channelUpdate({ ...payload });

    expect(task).toEqual({
      success: true,
      updatedChannel: {},
      status: 200,
    });
  });

  it('channelUpdate gives error', async () => {
    InteractionUtils.mockImplementation((value) => {
      return {
        channelUpdate: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { channelUpdate } = require('../../functions/twilio-wrappers/interactions.private');

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      interactionSid: 'Ixxx',
      channelSid: 'Cxxxx',
      status: 'Mock',
    };

    const errTask = await channelUpdate({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});
