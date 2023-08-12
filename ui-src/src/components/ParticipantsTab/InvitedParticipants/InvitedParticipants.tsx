import { Stack, Card, Heading } from '@twilio-paste/core';
import { Template, templates } from '@twilio/flex-ui';

import { InvitedParticipant } from './InvitedParticipant/InvitedParticipant';
import { InvitedParticipantDetails } from '../../../flex-hooks/types/InvitedParticipantDetails';
import { StringTemplates } from '../../../flex-hooks/strings/ChatTransferStrings';
import React from 'react';
interface InvitedParticipantsProps {
  invitedParticipantDetails: InvitedParticipantDetails[];
  handleCancelInvite: (invitedParticipantDetails: InvitedParticipantDetails) => void;
}

export const InvitedParticipants = ({ invitedParticipantDetails, handleCancelInvite }: InvitedParticipantsProps) => {
  const invitedParticipants = invitedParticipantDetails.map((invitedParticipantDetail) => {
    const participantName = invitedParticipantDetail.targetName;
    const { inviteTargetType } = invitedParticipantDetail;
    return (
      <InvitedParticipant
        participantName={participantName}
        key={invitedParticipantDetail.invitesTaskSid}
        inviteTargetType={inviteTargetType}
        handleCancelInvite={() => handleCancelInvite(invitedParticipantDetail)}
      />
    );
  });

  return (
    <Card padding="space60">
      <Heading as="h2" variant="heading20">
        {/* <Template source={templates['ConvTransferInvitedParticipants']} /> */}
      </Heading>
      <Stack orientation="vertical" spacing="space20">
        {invitedParticipants}
      </Stack>
    </Card>
  );
};
