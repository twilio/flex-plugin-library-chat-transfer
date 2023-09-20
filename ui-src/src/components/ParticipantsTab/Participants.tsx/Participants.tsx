import { Stack, Card, Heading } from '@twilio-paste/core';

import { Participant } from './Participant/Participant';
import { ParticipantDetails } from '../../../flex-hooks/types/ParticipantDetails';
import React from 'react';
interface ParticipantsProps {
  participantDetails: ParticipantDetails[];
  handleKickParticipant: (interactionParticipantSid: string) => void;
}

export const Participants = ({ participantDetails, handleKickParticipant }: ParticipantsProps) => {
  const participants = participantDetails.map((participantDetail) => {
    const { participantType } = participantDetail;
    const { isMe } = participantDetail;
    const allowKick = !isMe && participantType === 'agent';
    const participantName = participantDetail.friendlyName;
    const { interactionParticipantSid } = participantDetail;

    return (
      <Participant
        name={participantName}
        participantType={participantType}
        allowKick={allowKick}
        key={`participant-${interactionParticipantSid}`}
        handleKickParticiant={() => handleKickParticipant(interactionParticipantSid)}
      />
    );
  });

  return (
    <Card padding="space60">
      <Heading as="h2" variant="heading20"> </Heading>
      <Stack orientation="vertical" spacing="space20">
        {participants}
      </Stack>
    </Card>
  );
};
