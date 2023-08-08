import { registerCancelChatParticipantInvite } from '../cancelChatParticipantInvite'; // Update the path to the actual file
import TaskService from '../../../utils/TaskRouter/TaskRouterService';
import { removeInvitedParticipant } from '../../../helpers/inviteTracker';
import { Notifications } from '@twilio/flex-ui';

const conversation = {
  source: {
    sid: 'conversationSid',
    attributes: { someAttribute: 'value' },
  },
};
const invitesTaskSid = 'invitesTaskSid';

jest.mock('./mocked-task-service', () => ({
  updateTaskAssignmentStatus: jest.fn(),
}));

jest.mock('./mocked-invited-participant', () => ({
  removeInvitedParticipant: jest.fn(),
}));

jest.mock('./mocked-notifications', () => ({
  showNotification: jest.fn(),
}));

describe('handleCancelChatParticipantInvite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('cancels chat participant invite and shows success notification', async () => {
    await registerCancelChatParticipantInvite();

    expect(TaskService.updateTaskAssignmentStatus).toHaveBeenCalledWith(invitesTaskSid, 'canceled');
    expect(removeInvitedParticipant).toHaveBeenCalledWith(conversation.source.sid, conversation.source.attributes, invitesTaskSid);
    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatCancelParticipantInviteSuccess');
  });
});
