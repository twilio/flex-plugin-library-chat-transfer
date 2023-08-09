/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ParticipantsTab } from '../ParticipantsTab';
import { Actions } from '@twilio/flex-ui';
import { getUpdatedParticipantDetails, getUpdatedInvitedParticipantDetails } from '../hooks';

jest.mock('@twilio/flex-ui', () => {
    return {
      __esModule: true,
      Actions: {
        invokeAction: jest.fn(),
      },
      IconButton: (props) => <button {...props} />,
    };
  });

jest.mock('../../hooks', () => ({
  getUpdatedParticipantDetails: jest.fn(),
  getUpdatedInvitedParticipantDetails: jest.fn(),
}));

describe('ParticipantsTab', () => {
  const mockTask = {}; // mockTask what value should i put in - shyam
  const mockConversation = {}; //mockConversation what value should i put in  - shyam

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Participants and InvitedParticipants components', async () => {
    getUpdatedParticipantDetails.mockResolvedValue([]);
    getUpdatedInvitedParticipantDetails.mockReturnValue([]);

    render(<ParticipantsTab task={mockTask} conversation={mockConversation} />);

    //expect me kya dalna he - shyam
  });
});
