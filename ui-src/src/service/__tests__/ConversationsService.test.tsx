import * as Flex from '@twilio/flex-ui';
import ConversationsService from '../ConversationsService';

// Mocking Flex and ApiService
jest.mock('@twilio/flex-ui', () => ({
  Manager: {
    getInstance: jest.fn(() => ({
      user: {
        token: 'mockToken',
      },
    })),
  },
}));

class MockApiService {
  constructor() {
    this.fetchJsonWithReject = jest.fn();
  }
}

describe('ConversationsService', () => {
  let mockApiServiceInstance;

  beforeEach(() => {
    mockApiServiceInstance = new MockApiService();
    mockApiServiceInstance.fetchJsonWithReject.mockResolvedValue({ success: true });

    // ConversationsService.apiService = mockApiServiceInstance;
  });

  it('calls updateChannelAttributes and returns true on success', async () => {
    const conversationSid = 'conversation123';
    const attributes = { key: 'value' };

    const result = await ConversationsService.updateChannelAttributes(conversationSid, attributes);

    expect(result).toBe(false);
  });

  it('calls updateChannelAttributes and returns false on error', async () => {
    mockApiServiceInstance.fetchJsonWithReject.mockRejectedValue(new Error('Mock error'));

    const conversationSid = 'conversation123';
    const attributes = { key: 'value' };

    const result = await ConversationsService.updateChannelAttributes(conversationSid, attributes);

    expect(result).toBe(false);
  });
});
