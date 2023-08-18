import { handleCancelChatParticipantInvite } from '../cancelChatParticipantInvite';
import TaskService from '../../../utils/TaskRouter/TaskRouterService';
import { removeInvitedParticipant } from '../../../helpers/inviteTracker';
import { Notifications } from '@twilio/flex-ui';

// Mocking dependencies
jest.mock('../../../utils/TaskRouter/TaskRouterService');
jest.mock('../../../helpers/inviteTracker');
jest.mock('@twilio/flex-ui', () => ({
  Notifications: {
    showNotification: jest.fn(),
  },
  Manager: {
    getInstance: jest.fn().mockReturnValue({
      serviceConfiguration: {
        flex_service_instance_sid: jest.fn(),
      },
    }),
    configuration: jest.fn(),
  },
}));

describe('handleCancelChatParticipantInvite', () => {
  it('should handle cancelling chat participant invite', async () => {
    const payload = {
      conversation: {
        source: {
          sid: 'conversationSid',
          attributes: {
            /* attributes here */
          },
        },
      },
      invitesTaskSid: 'invitesTaskSid',
    };

    // Mocking TaskService.updateTaskAssignmentStatus
    TaskService.updateTaskAssignmentStatus.mockResolvedValue();

    // Mocking removeInvitedParticipant
    removeInvitedParticipant.mockResolvedValue();

    await handleCancelChatParticipantInvite(payload);

    expect(TaskService.updateTaskAssignmentStatus).toHaveBeenCalledWith('invitesTaskSid', 'canceled');
    expect(removeInvitedParticipant).toHaveBeenCalledWith(
      'conversationSid',
      payload.conversation.source.attributes,
      'invitesTaskSid',
    );
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatCancelParticipantInviteSuccess');
  });

  it('should handle API request failure', async () => {
    const payload = {
      conversation: {
        source: {
          sid: 'conversationSid',
          attributes: {
            /* attributes here */
          },
        },
      },
      invitesTaskSid: 'invitesTaskSid',
    };

    // Mocking TaskService.updateTaskAssignmentStatus to throw an error
    TaskService.updateTaskAssignmentStatus.mockRejectedValue(new Error('API request failed'));

    // Mocking removeInvitedParticipant
    removeInvitedParticipant.mockResolvedValue();

    await handleCancelChatParticipantInvite(payload);

    expect(TaskService.updateTaskAssignmentStatus).toHaveBeenCalledWith('invitesTaskSid', 'canceled');
    expect(removeInvitedParticipant).not.toHaveBeenCalled();
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatCancelParticipantInviteFailed');
  });
});
