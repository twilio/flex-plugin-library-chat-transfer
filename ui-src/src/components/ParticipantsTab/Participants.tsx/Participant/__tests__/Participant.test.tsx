/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Participant } from '../Participant';

// jest.mock('@twilio-paste/icons/esm/UserIcon', () => {
//   const UserIcon = <div title="User Icon"></div>;
// });

// jest.mock('@twilio-paste/icons/esm/AgentIcon', () => {
//   const AgentIcon = <div title="Agent Icon"></div>;
// });

// jest.mock('@twilio-paste/icons/esm/CloseIcon', () => {
//   const CloseIcon = <div title="Close Icon"></div>;
// });

// jest.mock('@twilio-paste/icons/esm/UserIcon', () => ({
//   UserIcon: () => <div title="User Icon"></div>,
// }));

// jest.mock('@twilio-paste/icons/esm/AgentIcon', () => (
//   const UserIcon = <div title="User Icon"></div>;
// ));

describe('Participant', () => {
  const mockProps = {
    participantType: 'agent',
    name: 'twilio-user',
    allowKick: true,
    handleKickParticiant: jest.fn(),
  };

  it.only('renders agent icon if participantType is agent', () => {
    const { getByTitle } = render(<Participant {...mockProps} />);
    const agentIcon = getByTitle('Agent Icon');

    expect(agentIcon).toBeInTheDocument();
  });

  it('renders user icon if participantType is not agent', () => {
    const { getByTitle } = render(<Participant {...mockProps} participantType="customer" />);
    const userIcon = getByTitle('User Icon');

    expect(userIcon).toBeInTheDocument();
  });

  it('disables kick button if allowKick is false', () => {
    const { getByRole } = render(<Participant {...mockProps} allowKick={false} />);
    const kickButton = getByRole('button');

    expect(kickButton).toBeDisabled();
  });

  it('calls handleKickParticiant function when kick button is clicked', () => {
    const { getByRole } = render(<Participant {...mockProps} />);
    const kickButton = getByRole('button');

    fireEvent.click(kickButton);

    expect(mockProps.handleKickParticiant).toHaveBeenCalled();
  });

  it('sets kickHandled state to true and disables kick button after clicking', () => {
    const { getByRole } = render(<Participant {...mockProps} />);
    const kickButton = getByRole('button');

    fireEvent.click(kickButton);

    expect(kickButton).toBeDisabled();
  });

  it('renders the participant name', () => {
    const { getByText } = render(<Participant {...mockProps} />);
    const participantName = getByText(mockProps.name);

    expect(participantName).toBeInTheDocument();
  });
});
