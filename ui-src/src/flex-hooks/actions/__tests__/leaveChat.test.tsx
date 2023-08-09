/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
import { registerLeaveChatAction } from '../leaveChat';
import { Actions, Notifications } from '@twilio/flex-ui';

jest.mock('@twilio/flex-ui', () => ({
  Actions: {
    registerAction: jest.fn(),
  },
  Notifications: {
    showNotification: jest.fn(),
  },
}));

jest.mock('../../../helpers/APIHelper', () => ({
  buildRemoveMyPartiticipantAPIPayload: jest.fn(),
}));

const mockConversation = {
  source: {
    sid: 'conversationSid',
  },
};

describe('handleLeaveChatAction', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removes participant from chat', async () => {
    const mockPayload = { some: 'payload' };
    require('../../../helpers/APIHelper').buildRemoveMyPartiticipantAPIPayload.mockResolvedValue(mockPayload);

    const mockRemoveParticipantAPIRequest = jest.fn();
    require('../../../helpers/APIHelper').ChatTransferService = {
      removeParticipantAPIRequest: mockRemoveParticipantAPIRequest,
    };

    registerLeaveChatAction();

    // expect(require('../../../helpers/APIHelper').buildRemoveMyPartiticipantAPIPayload).toHaveBeenCalledWith(mockConversation);
    // expect(mockRemoveParticipantAPIRequest).toHaveBeenCalledWith(mockPayload);
    expect(Notifications.showNotification).not.toHaveBeenCalled();
  });

  it('shows failure notification when removing participant fails', async () => {
    require('../../../helpers/APIHelper').buildRemoveMyPartiticipantAPIPayload.mockResolvedValue(null);
    registerLeaveChatAction();

    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantFailed');
  });

  it('shows failure notification when API request fails', async () => {
    const mockPayload = { some: 'payload' };
    require('../../../helpers/APIHelper').buildRemoveMyPartiticipantAPIPayload.mockResolvedValue(mockPayload);

    const mockError = new Error('API request failed');
    require('../../../helpers/APIHelper').ChatTransferService = {
      removeParticipantAPIRequest: jest.fn().mockRejectedValue(mockError),
    };
    await registerLeaveChatAction();
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantFailed');
  });
});
