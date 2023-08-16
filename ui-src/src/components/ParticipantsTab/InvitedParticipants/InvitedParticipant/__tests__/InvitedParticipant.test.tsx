import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InvitedParticipant } from '../InvitedParticipant';

describe('InvitedParticipant', () => {
  const mockParticipantName = 'John Doe';
  const mockInviteTargetType = 'Worker';
  const mockHandleCancelInvite = jest.fn();

  it('renders correctly with Worker invite type', () => {
    const { getByText, getByTitle } = render(
      <InvitedParticipant
        participantName={mockParticipantName}
        inviteTargetType={mockInviteTargetType}
        handleCancelInvite={mockHandleCancelInvite}
      />,
    );

    const cancelButton = getByTitle('ConvTransferCancelInvite');

    fireEvent.click(cancelButton);

    expect(mockHandleCancelInvite).toHaveBeenCalledTimes(1);
  });

  it('renders screenshot', () => {
    const wrapper = render(
      <InvitedParticipant
        participantName={mockParticipantName}
        inviteTargetType={mockInviteTargetType}
        handleCancelInvite={mockHandleCancelInvite}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  // Add more test cases for other invite target types if needed
});
