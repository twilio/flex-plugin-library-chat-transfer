import { handleRemoveChatParticipant } from '../removeChatParticipant';
import { Notifications } from '@twilio/flex-ui';
import ChatTransferService from '../../../helpers/APIHelper';

// Mocking dependencies
jest.mock('@twilio/flex-ui', () => ({
  Notifications: {
    showNotification: jest.fn(),
  },
}));
jest.mock('../../../helpers/APIHelper', () => ({
  buildRemovePartiticipantAPIPayload: jest.fn(),
  removeParticipantAPIRequest: jest.fn(),
}));

describe('handleRemoveChatParticipant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle removing chat participant successfully', async () => {
    const payload = {
      task: { /* task object */ },
      interactionParticipantSid: 'participantSid',
    };

    const removePartcipantAPIPayload = { /* API payload */ };
    ChatTransferService.buildRemovePartiticipantAPIPayload.mockReturnValue(removePartcipantAPIPayload);
    ChatTransferService.removeParticipantAPIRequest.mockResolvedValue();

    await handleRemoveChatParticipant(payload);

    expect(ChatTransferService.buildRemovePartiticipantAPIPayload).toHaveBeenCalledWith(payload.task, payload.interactionParticipantSid);
    expect(ChatTransferService.removeParticipantAPIRequest).toHaveBeenCalledWith(removePartcipantAPIPayload);
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantSuccess');
  });

  it('should handle API request failure', async () => {
    const payload = {
      task: { /* task object */ },
      interactionParticipantSid: 'participantSid',
    };

    const removePartcipantAPIPayload = { /* API payload */ };
    ChatTransferService.buildRemovePartiticipantAPIPayload.mockReturnValue(removePartcipantAPIPayload);
    ChatTransferService.removeParticipantAPIRequest.mockRejectedValue(new Error('API request failed'));

    await handleRemoveChatParticipant(payload);

    expect(ChatTransferService.buildRemovePartiticipantAPIPayload).toHaveBeenCalledWith(payload.task, payload.interactionParticipantSid);
    expect(ChatTransferService.removeParticipantAPIRequest).toHaveBeenCalledWith(removePartcipantAPIPayload);
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantFailed');
  });

  it('should handle error building API payload', async () => {
    const payload = {
      task: { /* task object */ },
      interactionParticipantSid: 'participantSid',
    };

    ChatTransferService.buildRemovePartiticipantAPIPayload.mockReturnValue(null);

    await handleRemoveChatParticipant(payload);

    expect(ChatTransferService.buildRemovePartiticipantAPIPayload).toHaveBeenCalledWith(payload.task, payload.interactionParticipantSid);
    expect(ChatTransferService.removeParticipantAPIRequest).not.toHaveBeenCalled();
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatRemoveParticipantFailed');
  });
});
