import {
  getConversation,
  participantList,
  updateAttributes,
  addWebhook,
  removeWebhook,
} from '../../functions/twilio-wrappers/conversations.private';
describe('getConversation', () => {
  const mockClient = {
    conversations: {
      v1: {
        conversations: {
          fetch: jest.fn(),
        },
      },
    },
  };

  const mockContext = {
    getTwilioClient: () => mockClient,
  };

  it('returns conversation', async () => {
    mockClient.conversations.v1.conversations.fetch.mockResolvedValue({
      /* mocked conversation data */
    });

    const result = await getConversation({
      context: mockContext,
      conversationSid: 'conversationSid123',
    });

    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
    expect(result.conversation).toBeDefined();
  });

  it('handles retry on error', async () => {
    const mockRetryHandler = jest.fn();
    const mockRetryError = new Error('Retry Error');
    mockClient.conversations.v1.conversations.fetch.mockRejectedValue(mockRetryError);

    const result = await getConversation({
      context: mockContext,
      conversationSid: 'conversationSid123',
      attempts: 1,
    });

    expect(result).toBeInstanceOf(Error);
    expect(mockRetryHandler).toHaveBeenCalledWith(mockRetryError, expect.any(Object), updateAttributes);
  });
});

// Similarly, add test cases for other functions (participantList, updateAttributes, addWebhook, removeWebhook)
