/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { ParticipantsTab } from '../ParticipantsTab';
import { Actions } from '@twilio/flex-ui';
import '@testing-library/jest-dom';
import { getUpdatedParticipantDetails, getUpdatedInvitedParticipantDetails } from '../hooks';
import { wrap } from 'lodash';
import { ITask, ConversationState } from '@twilio/flex-ui';

jest.mock('../hooks', () => ({
  getUpdatedParticipantDetails: jest.fn(),
  getUpdatedInvitedParticipantDetails: jest.fn(),
}));

describe('ParticipantsTab', () => {
  const mockTask = { sid: '1672673' } as unknown as ITask;
  const mockConversation = {sid : '1111'} as unkown as ConversationState.ConversationState;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Participants and InvitedParticipants components', async () => {
    getUpdatedParticipantDetails.mockResolvedValue([]);
    getUpdatedInvitedParticipantDetails.mockReturnValue([]);

    const wrapper = render(<ParticipantsTab task={mockTask} conversation={mockConversation} />);
  });
});
