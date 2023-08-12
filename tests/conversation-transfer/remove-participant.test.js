import helpers from '../test-utils/test-helper';

beforeAll(() => {
  helpers.setup();
  global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
  global.Runtime._addFunction('twilio-wrappers/taskrouter', './functions/twilio-wrappers/taskrouter.private.js');
  global.Runtime._addFunction('twilio-wrappers/retry-handler', './functions/twilio-wrappers/retry-handler.private.js');
});

describe('Leave Interaction Function', () => {
  it('should successfully close interaction and conversation', async () => {
    const context = {
      // ... your context variables
    };

    const event = {
      flexInteractionSid: 'interaction_sid',
      flexInteractionChannelSid: 'channel_sid',
      flexInteractionParticipantSid: 'participant_sid',
      conversationSid: 'conversation_sid',
      // ... other required properties based on your function
    };

    // Mock InteractionsOperations.participantUpdate response
    const mockParticipantUpdateResponse = {
      success: true,
    };

    // Mock ConversationsOperations.participantList response
    const mockParticipantListResponse = {
      participants: [
        // ... mock participants
      ],
    };

    // Mock ConversationsOperations.getConversation response
    const mockGetConversationResponse = {
      conversation: {
        attributes: JSON.stringify({
          invites: {
            // ... mock invites
          },
        }),
      },
    };

    // Mock InteractionsOperations.channelUpdate response
    const mockChannelUpdateResponse = {
      success: true,
    };

    // Mock the relevant functions
    jest.spyOn(InteractionsOperations, 'participantUpdate').mockResolvedValue(mockParticipantUpdateResponse);
    jest.spyOn(ConversationsOperations, 'participantList').mockResolvedValue(mockParticipantListResponse);
    jest.spyOn(ConversationsOperations, 'getConversation').mockResolvedValue(mockGetConversationResponse);
    jest.spyOn(InteractionsOperations, 'channelUpdate').mockResolvedValue(mockChannelUpdateResponse);

    // Create mock objects for response and callback
    const response = {
      setStatusCode: jest.fn(),
      setBody: jest.fn(),
    };
    const callback = jest.fn();

    // Call the handler function
    await leaveInteractionHandler(context, event, callback, response, jest.fn());

    // Assertions
    expect(response.setStatusCode).toHaveBeenCalledWith(201);
    expect(response.setBody).toHaveBeenCalledWith({
      success: true,
    });
    expect(callback).toHaveBeenCalledWith(null, response);

    // Restore mocked functions
    jest.restoreAllMocks();
  });
});
