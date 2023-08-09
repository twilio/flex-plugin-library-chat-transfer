/* eslint-disable no-undef */
import { eventHook } from '../pluginsInitialized';
import { registerCustomChatTransferAction } from '../../actions/chatTransferTask';
import { registerLeaveChatAction } from '../../actions/leaveChat';
import { registerRemoveChatParticipant } from '../../actions/removeChatParticipant';
import { registerCancelChatParticipantInvite } from '../../actions/cancelChatParticipantInvite';

jest.mock('../../actions/chatTransferTask', () => {
  return {
    registerCustomChatTransferAction: jest.fn(),
  };
});

jest.mock('../../actions/leaveChat', () => {
  return {
    registerLeaveChatAction: jest.fn(),
  };
});

jest.mock('../../actions/removeChatParticipant', () => {
  return {
    registerRemoveChatParticipant: jest.fn(),
  };
});

jest.mock('../../actions/cancelChatParticipantInvite', () => {
  return {
    registerCancelChatParticipantInvite: jest.fn(),
  };
});

describe('eventHook', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    jest.clearAllMocks();
  });

  it('should call the required register functions', () => {
    eventHook();

    expect(registerCustomChatTransferAction).toHaveBeenCalledTimes(1);
    expect(registerLeaveChatAction).toHaveBeenCalledTimes(1);
    expect(registerRemoveChatParticipant).toHaveBeenCalledTimes(1);
    expect(registerCancelChatParticipantInvite).toHaveBeenCalledTimes(1);
  });
});
