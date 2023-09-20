import { handleChatTransferAction } from '../chatTransferTask';
import { ITask, Notifications, StateHelper } from '@twilio/flex-ui';
import ChatTransferService from '../../../helpers/APIHelper';
import { countOfOutstandingInvitesForConversation } from '../../../helpers/inviteTracker';
// Mocking dependencies

jest.mock('../../../config', () => {
  return {
    isColdTransferEnabled: jest.fn().mockReturnValue(true),
    isMultiParticipantEnabled: jest.fn().mockReturnValue(true),
  }
});

jest.mock('@twilio/flex-ui', () => ({
  Notifications: {
    showNotification: jest.fn(),
  },
  StateHelper: {
    getConversationStateForTask: jest.fn(),
  },
}));
jest.mock('../../../helpers/APIHelper', () => ({
  sendTransferChatAPIRequest: jest.fn(),
  buildInviteParticipantAPIPayload: jest.fn().mockReturnValue(true),
}));
jest.mock('../../../helpers/inviteTracker', () => ({
  countOfOutstandingInvitesForConversation: jest.fn().mockReturnValue(1),
}));

describe('handleChatTransferAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle chat transfer successfully', async () => {
    const payload = {
      task: {} as unknown as ITask,
      targetSid: 'targetSid',
      options: {
        mode: 'COLD',
      },
    };

    const conversation = true;
    StateHelper.getConversationStateForTask.mockReturnValue(conversation);
    countOfOutstandingInvitesForConversation.mockReturnValue(0);
    ChatTransferService.sendTransferChatAPIRequest.mockResolvedValue();

    await handleChatTransferAction(payload);

    expect(StateHelper.getConversationStateForTask).toHaveBeenCalledWith(payload.task);
    expect(countOfOutstandingInvitesForConversation).toHaveBeenCalledWith(conversation);
    // expect(ChatTransferService.sendTransferChatAPIRequest).toHaveBeenCalledWith(/* expected transferChatAPIPayload */);
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatTransferTaskSuccess');
  });

  it('should handle chat transfer failure', async () => {
    const payload = {
      task: { /* task object */ },
      targetSid: 'targetSid',
      options: {},
    };

    StateHelper.getConversationStateForTask.mockReturnValue(null);
    countOfOutstandingInvitesForConversation.mockReturnValue(0);
    ChatTransferService.sendTransferChatAPIRequest.mockRejectedValue(new Error('API request failed'));

    await handleChatTransferAction(payload);

    expect(StateHelper.getConversationStateForTask).toHaveBeenCalledWith(payload.task);
    expect(countOfOutstandingInvitesForConversation).not.toHaveBeenCalled();
    // expect(ChatTransferService.sendTransferChatAPIRequest).toHaveBeenCalledWith(/* expected transferChatAPIPayload */);
    // expect(Notifications.showNotification).toHaveBeenCalledWith('ChatTransferFailedGeneric');
  });
});
