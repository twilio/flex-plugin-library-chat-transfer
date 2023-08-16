import { Flex as FlexBox, Box, Button } from '@twilio-paste/core';
import { UserIcon } from '@twilio-paste/icons/cjs/UserIcon';
import { AgentIcon } from '@twilio-paste/icons/cjs/AgentIcon';
import { CloseIcon } from '@twilio-paste/icons/cjs/CloseIcon';
import { useState } from 'react';
import { templates } from '@twilio/flex-ui';
import React from 'react';


import { ParticipantType } from '../../../../flex-hooks/types/ParticipantDetails';
import { StringTemplates } from '../../../../flex-hooks/strings/ChatTransferStrings';

interface ParticipantProps {
  name: string;
  allowKick: boolean;
  participantType: ParticipantType;
  handleKickParticiant: () => void;
}

export const Participant = ({ participantType, name, allowKick, handleKickParticiant }: ParticipantProps) => {
  const [kickHandled, setKickHandled] = useState(false);

  const handleKick = () => {
    setKickHandled(true);
    handleKickParticiant();
  };

  const icon =
    participantType === 'agent' ? (
      <AgentIcon decorative={false} title="ConvTransferAgent" />
    ) : (
      <UserIcon decorative={false} title="ConvTransferCustomer" />
    );

  const disableKickParticipant = !allowKick;

  return (
    <FlexBox>
      <FlexBox>
        <Box padding="space20">{icon}</Box>
      </FlexBox>
      <FlexBox grow>
        <Box padding="space20" width="100%">
          {name}
        </Box>
      </FlexBox>
      <FlexBox>
        <Box padding="space20">
          <Button variant="secondary" size="icon" disabled={kickHandled || disableKickParticipant} onClick={handleKick}>
            <CloseIcon decorative title="ConvTransferRemove" />
          </Button>
        </Box>
      </FlexBox>
    </FlexBox>
  );
};
