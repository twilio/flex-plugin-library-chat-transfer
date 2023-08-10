import { handleLeaveChatAction } from '../leaveChat';
import { Notifications } from '@twilio/flex-ui';
import ChatTransferService from '../../../helpers/APIHelper';

// Mocking dependencies
jest.mock('@twilio/flex-ui', () => ({
  Notifications: {
    showNotification: jest.fn(),
  },
}));
jest.mock('../../../helpers/APIHelper', () => ({
  buildRemoveMyPartiticipantAPIPayload: jest.fn(),
  removeParticipantAPIRequest: jest.fn(),
}));

describe('handleLeaveChatAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle leaving chat successfully', async () => {
    const payload = {
      conversation: {
        source: {
          sid: 'conversationSid',
        },
      },
    };

    const removePartcipantAPIPayload = { /* API payload */ };
    ChatTransferService.buildRemoveMyPartiticipantAPIPayload.mockReturnValue(removePartcipantAPIPayload);
    ChatTransferService.removeParticipantAPIRequest.mockResolvedValue();

    await handleLeaveChatAction(payload);

    expect(ChatTransferService.buildRemoveMyPartiticipantAPIPayload).toHaveBeenCalledWith(payload.conversation);
    expect(ChatTransferService.removeParticipantAPIRequest).toHaveBeenCalledWith(removePartcipantAPIPayload);
    expect(Notifications.showNotification).not.toHaveBeenCalled();
  });

  it('should handle API request failure', async () => {
    const payload = {
      conversation: {
        source: {
          sid: 'conversationSid',
        },
      },
    };

    const removePartcipantAPIPayload = { /* API payload */ };
    ChatTransferService.buildRemoveMyPartiticipantAPIPayload.mockReturnValue(removePartcipantAPIPayload);
    ChatTransferService.removeParticipantAPIRequest.mockRejectedValue(new Error('API request failed'));

    await handleLeaveChatAction(payload);

    expect(ChatTransferService.buildRemoveMyPartiticipantAPIPayload).toHaveBeenCalledWith(payload.conversation);
    expect(ChatTransferService.removeParticipantAPIRequest).toHaveBeenCalledWith(removePartcipantAPIPayload);
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantFailed');
  });

  it('should handle error building API payload', async () => {
    const payload = {
      conversation: {
        source: {
          sid: 'conversationSid',
        },
      },
    };

    ChatTransferService.buildRemoveMyPartiticipantAPIPayload.mockReturnValue(null);

    await handleLeaveChatAction(payload);

    expect(ChatTransferService.buildRemoveMyPartiticipantAPIPayload).toHaveBeenCalledWith(payload.conversation);
    expect(ChatTransferService.removeParticipantAPIRequest).not.toHaveBeenCalled();
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantFailed');
  });

  // Add more test cases for different scenarios
});
