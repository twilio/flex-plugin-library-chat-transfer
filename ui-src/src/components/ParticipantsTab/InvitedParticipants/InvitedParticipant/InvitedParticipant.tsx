import { Flex as FlexBox, Box, Button } from '@twilio-paste/core';
import { ChatIcon } from '@twilio-paste/icons/cjs/ChatIcon';
import { AgentIcon } from '@twilio-paste/icons/cjs/AgentIcon';
import { CloseIcon } from '@twilio-paste/icons/cjs/CloseIcon';
import { useState } from 'react';
import React from 'react';

import { ParticipantInviteType } from '../../../../flex-hooks/types/ParticipantInvite';

interface InvitedParticipantProps {
  participantName: string;
  inviteTargetType: ParticipantInviteType;
  handleCancelInvite: () => void;
}

export const InvitedParticipant = ({
  participantName,
  inviteTargetType,
  handleCancelInvite,
}: InvitedParticipantProps) => {
  const [cancelHandled, setCancelHandled] = useState(false);

  const handleCancel = () => {
    setCancelHandled(true);
    handleCancelInvite();
  };

  const icon =
    inviteTargetType === 'Worker' ? (
      <AgentIcon decorative={false} title="ConvTransferAgent" />
    ) : (
      <ChatIcon decorative={false} title="ConvTransferQueue" />
    );

  return (
    <FlexBox>
      <FlexBox>
        <Box padding="space20">{icon}</Box>
      </FlexBox>
      <FlexBox grow>
        <Box padding="space20" width="100%">
          {participantName}
        </Box>
      </FlexBox>
      <FlexBox>
        <Box padding="space20">
          <Button variant="secondary" size="icon" disabled={cancelHandled} onClick={handleCancel}>
            <CloseIcon decorative title="ConvTransferCancelInvite" />
          </Button>
        </Box>
      </FlexBox>
    </FlexBox>
  );
};
