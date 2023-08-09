/* eslint-disable no-undef */
import { Actions, Notifications, StateHelper, ITask } from '@twilio/flex-ui';
import { registerCustomChatTransferAction } from '../chatTransferTask'; // Replace 'yourModule' with the correct path
import { countOfOutstandingInvitesForConversation } from '../../../helpers/inviteTracker';
import { buildInviteParticipantAPIPayload } from '../../../helpers/APIHelper';
// import { TransferActionPayload } from '../../types/ActionPayloads';

import * as Flex from '@twilio/flex-ui';

const t = { sid: '1672673' } as unknown as ITask;

const mockTransferOptions = {
  attributes: 'string',
  mode: 'cold',
  priority: 'low',
};

const payload = {
  task: t,
  sid: '123456',
  targetSid: '123',
  options: mockTransferOptions,
};

jest.mock('../../types/ActionPayloads', () => {
  TransferActionPayload: jest.fn().mockReturnValue(payload);
});

jest.mock('@twilio/flex-ui', () => {
  return {
    __esModule: true,
    Actions: {
      registerAction: jest.fn(),
    },
    Notifications: {
      showNotification: jest.fn(),
    },
    StateHelper: {
      getConversationStateForTask: jest.fn(),
    },
  };
});
jest.mock('../../../helpers/APIHelper', () => ({
  buildInviteParticipantAPIPayload: jest.fn(),
}));
jest.mock('../../../helpers/inviteTracker', () => ({
  countOfOutstandingInvitesForConversation: jest.fn(),
}));
jest.mock('../../../flex-hooks/notifications/TransferResult', () => ({
  NotificationIds: {
    ChatCancelParticipantInviteFailedInviteOutstanding: 'ChatCancelParticipantInviteFailedInviteOutstanding',
    ChatTransferFailedGeneric: 'ChatTransferFailedGeneric',
    ChatTransferFailedAlreadyParticipating: 'ChatTransferFailedAlreadyParticipating',
    ChatTransferTaskSuccess: 'ChatTransferTaskSuccess',
    ChatParticipantInvited: 'ChatParticipantInvited',
  },
}));
jest.mock('../../../helpers/APIHelper', () => ({
  sendTransferChatAPIRequest: jest.fn(),
  buildInviteParticipantAPIPayload: jest.fn(),
}));

describe('handleChatTransferAction', () => {
  beforeEach(() => {
    Actions.registerAction.mockClear();
    Notifications.showNotification.mockClear();
  });

  it('displays ChatCancelParticipantInviteFailedInviteOutstanding notification', async () => {
    const mockPayload = {
      task: {},
      targetSid: 'targetSid123',
    };
    jest.spyOn(Flex.StateHelper as any, 'getConversationStateForTask').mockReturnValue({});
    // jest.spyOn(countOfOutstandingInvitesForConversation as any, 'countOfOutstandingInvitesForConversation').mockReturnValue(1);

    // StateHelper.getConversationStateForTask = jest.fn().mockReturnValue({});
    countOfOutstandingInvitesForConversation.mockReturnValue(1);
    registerCustomChatTransferAction();

    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatCancelParticipantInviteFailedInviteOutstanding');
  });

  it('displays ChatTransferFailedGeneric notification', async () => {
    const mockPayload = {
      task: {},
      targetSid: 'targetSid123',
    };
    jest.spyOn(StateHelper, 'getConversationStateForTask').mockReturnValue({});
    countOfOutstandingInvitesForConversation.mockReturnValue(0);
    buildInviteParticipantAPIPayload.mockReturnValue(null);

    registerCustomChatTransferAction();

    expect(Notifications.showNotification).toHaveBeenCalledWith('ChatTransferFailedGeneric');
  });
});

describe('registerCustomChatTransferAction', () => {
  it('registers the custom ChatTransferTask action', async () => {
    registerCustomChatTransferAction();

    expect(Actions.registerAction).toHaveBeenCalledWith('ChatTransferTask', expect.any(Function));
  });
});
