import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Participants } from '../Participants';

jest.mock('@twilio/flex-ui', () => ({
  Template: jest.fn(({ source }) => <span>{source}</span>),
  templates: {
    [Symbol()]: 'MockedTemplate',
  },
}));

describe('Participants', () => {
  const mockParticipantDetails = [
    { friendlyName: 'Participant 1', participantType: 'agent', isMe: false, interactionParticipantSid: '123' },
    { friendlyName: 'Participant 2', participantType: 'customer', isMe: true, interactionParticipantSid: '456' },
  ];
  it('renders participants with correct details', () => {
    const mockHandleKickParticipant = jest.fn();

    const { getByText } = render(
      <Participants participantDetails={mockParticipantDetails} handleKickParticipant={mockHandleKickParticipant} />
    );
    expect(getByText).toMatchSnapshot();
  });
});
