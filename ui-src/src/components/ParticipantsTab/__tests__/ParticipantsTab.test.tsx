import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ParticipantsTab } from '../ParticipantsTab';
import { ITask, ConversationState } from '@twilio/flex-ui';


describe('ParticipantsTab', () => {
  // Mocked data
  const task = { sid: '1672673' } as unknown as ITask;
  const conversation = { sid: '76522' } as unknown as ConversationState;

  it('renders participant details and invited participant details', () => {
    render(<ParticipantsTab task={task} conversation={conversation} />);

    // Assuming your Participants and InvitedParticipants components render data,
    // you can use queries like getByText, getByTestId, etc. to check if they're rendered.
    // Example: screen.getByText('Participant Name');
    // Example: screen.getByTestId('invited-participant-1');
  });

  it('calls handleKickParticipant when kicking a participant', () => {
    const mockHandleKickParticipant = jest.fn();
    render(<ParticipantsTab task={task} conversation={conversation} handleKickParticipant={mockHandleKickParticipant} />);

    // Simulate the action of kicking a participant (you need to adjust this according to your UI)
    // Example: fireEvent.click(screen.getByTestId('kick-button'));

    // Check if the handleKickParticipant function was called
    expect(mockHandleKickParticipant).toHaveBeenCalledWith('participantSid'); // Replace with actual participant Sid
  });

  it('calls handleCancelInvite when canceling an invite', () => {
    const mockHandleCancelInvite = jest.fn();
    render(<ParticipantsTab task={task} conversation={conversation} handleCancelInvite={mockHandleCancelInvite} />);

    // Simulate the action of canceling an invite (you need to adjust this according to your UI)
    // Example: fireEvent.click(screen.getByTestId('cancel-invite-button'));

    // Check if the handleCancelInvite function was called
    expect(mockHandleCancelInvite).toHaveBeenCalledWith(/* mocked invitedParticipantDetails */);
  });
});
