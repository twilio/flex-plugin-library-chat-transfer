import { getUpdatedParticipantDetails, getUpdatedInvitedParticipantDetails } from '../hooks'; // Replace 'yourModule' with the correct path
import { ITask } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui';

describe('getUpdatedParticipantDetails', () => {
  const mockTask = {
    attributes: {
      flexInteractionChannelSid: 'interactionSid123',
    } as unknown as ITask,
    getParticipants: jest.fn(), // Mocking the getParticipants method
  };

  const mockConversation = {
    participants: new Map([
      ['participant1', { source: { sid: 'participant1', identity: 'user1' }, friendlyName: 'User 1' }],
      ['participant2', { source: { sid: 'participant2', identity: 'agent1' }, friendlyName: 'Agent 1' }],
    ]),
  };

  const mockInteractionParticipants = [
    {
      mediaProperties: { sid: 'participant1', identity: 'user1' },
      type: 'user',
      participantSid: 'participantSid1',
    },
    {
      mediaProperties: { sid: 'participant3', identity: 'agent2' },
      type: 'agent',
      participantSid: 'participantSid2',
    },
  ];

  const mockManager = {
    conversationsClient: {
      user: {
        identity: 'user1',
      },
    },
  };

  beforeAll(() => {
    // Mocking the Flex.Manager.getInstance() to return the mock manager
    jest.spyOn(Flex.Manager, 'getInstance').mockReturnValue(mockManager);
  });

  it('returns updated participant details', async () => {
    // Mocking the getParticipants function to return interaction participants
    mockTask.getParticipants.mockResolvedValue(mockInteractionParticipants);

    const updatedDetails = await getUpdatedParticipantDetails(mockTask, mockConversation, []);
    expect(updatedDetails).toEqual([
      {
        friendlyName: 'User 1',
        participantType: 'user',
        isMe: false,
        interactionParticipantSid: 'participantSid1',
        conversationMemberSid: 'participant1',
      },
    ]);
  });
});

describe('getUpdatedInvitedParticipantDetails', () => {
  it('returns updated invited participant details', () => {
    const mockConversation = {
      source: {
        attributes: {
          invites: {
            invite1: {
              identity: 'user1',
            },
            invite2: {
              identity: 'user2',
            },
          },
        },
      },
    };

    const updatedInvitedDetails = getUpdatedInvitedParticipantDetails(mockConversation);
    expect(updatedInvitedDetails).toEqual([
      {
        identity: 'user1',
      },
      {
        identity: 'user2',
      },
    ]);
  });

  it('returns empty array if invites attribute is not present', () => {
    const mockConversation = {
      source: {
        attributes: {},
      },
    };

    const updatedInvitedDetails = getUpdatedInvitedParticipantDetails(mockConversation);
    expect(updatedInvitedDetails).toEqual([]);
  });
});
