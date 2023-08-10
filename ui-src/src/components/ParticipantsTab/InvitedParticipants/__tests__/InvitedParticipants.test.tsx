import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InvitedParticipants } from '../InvitedParticipants';

describe('InvitedParticipants', () => {
  const mockInvitedParticipantDetails = [
    // ... mock details
  ];

  it('renders invited participants correctly', () => {
    const mockHandleCancelInvite = jest.fn();

    const { getByText } = render(
      <InvitedParticipants
        invitedParticipantDetails={mockInvitedParticipantDetails}
        handleCancelInvite={mockHandleCancelInvite}
      />
    );

    const invitedParticipantsHeader = getByText('Invited Participants:');
    expect(invitedParticipantsHeader).toBeInTheDocument();

    // Loop through each invited participant and check if their names are rendered
    mockInvitedParticipantDetails.forEach((invitedParticipantDetail) => {
      const participantNameElement = getByText(invitedParticipantDetail.targetName);
      expect(participantNameElement).toBeInTheDocument();
    });

    // Click the cancel button for each participant and check if the callback is called
    mockInvitedParticipantDetails.forEach((invitedParticipantDetail) => {
      const cancelButton = getByTitle(`Cancel Invite for ${invitedParticipantDetail.targetName}`);
      fireEvent.click(cancelButton);
      expect(mockHandleCancelInvite).toHaveBeenCalledWith(invitedParticipantDetail);
    });
  });
});
