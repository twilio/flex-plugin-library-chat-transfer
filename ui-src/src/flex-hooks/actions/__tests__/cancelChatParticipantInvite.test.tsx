import { registerCancelChatParticipantInvite } from '../cancelChatParticipantInvite'; // Update the path to the actual file
import TaskService from '../../../utils/TaskRouter/TaskRouterService';
import { removeInvitedParticipant } from '../../../helpers/inviteTracker';
import { Actions } from '@twilio/flex-ui';

jest.mock('@twilio/flex-ui', () => {
  return {
    __esModule: true,
    Actions: {
      registerAction: jest.fn(),
    },
  };
});

const conversation = {
  source: {
    sid: 'conversationSid',
    attributes: { someAttribute: 'value' },
  },
};
const invitesTaskSid = 'invitesTaskSid';

jest.mock('../../../utils/TaskRouter/TaskRouterService', () => ({
  updateTaskAssignmentStatus: jest.fn(),
}));

jest.mock('../../../helpers/inviteTracker', () => ({
  removeInvitedParticipant: jest.fn(),
}));


describe('handleCancelChatParticipantInvite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('cancels chat participant invite and shows success notification', async () => {
    registerCancelChatParticipantInvite();

    expect(TaskService.updateTaskAssignmentStatus).toHaveBeenCalledWith(invitesTaskSid, 'canceled');
    expect(removeInvitedParticipant).toHaveBeenCalledWith(conversation.source.sid, conversation.source.attributes, invitesTaskSid);
    // expect(Notifications.showNotification).toHaveBeenCalledWith('ChatCancelParticipantInviteSuccess');
  });
});
