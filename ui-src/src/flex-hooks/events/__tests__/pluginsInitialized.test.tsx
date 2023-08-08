import { eventHook } from '../pluginsInitialized';

jest.mock('../../actions/', () => ({
  registerCustomChatTransferAction: jest.fn(),
  registerLeaveChatAction: jest.fn(),
  registerRemoveChatParticipant: jest.fn(),
  registerCancelChatParticipantInvite: jest.fn(),
}));

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
