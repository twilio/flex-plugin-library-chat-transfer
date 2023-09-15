/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Participant } from '../Participant';

describe('Participant', () => {
  const mockProps = {
    participantType: 'agent',
    name: 'twilio-user',
    allowKick: true,
    handleKickParticiant: jest.fn(),
  };

  it('calls handleKickParticiant function when kick button is clicked', () => {
    const { getByRole } = render(<Participant {...mockProps} />);
    const kickButton = getByRole('button');

    fireEvent.click(kickButton);

    expect(mockProps.handleKickParticiant).toHaveBeenCalled();
  });

  it('renders Participant Tab', () => {
    const getByTitle = render(<Participant {...mockProps} />);

    // expect(getByTitle).toMatchSnapshot();
  });
});
