import * as Flex from '@twilio/flex-ui';
import { useState, useEffect } from 'react';
import { Stack, Box } from '@twilio-paste/core';
import { ConversationState, styled, Actions } from '@twilio/flex-ui';
import React from 'react';
import { Participants } from './Participants.tsx/Participants';
import { InvitedParticipants } from './InvitedParticipants/InvitedParticipants';
import { ParticipantDetails } from '../../flex-hooks/types/ParticipantDetails';
import { InvitedParticipantDetails } from '../../flex-hooks/types/InvitedParticipantDetails';
import { getUpdatedParticipantDetails, getUpdatedInvitedParticipantDetails } from './hooks';
import {
  CancelChatParticipantInviteActionPayload,
  RemoveChatParticipantActionPayload,
} from '../../flex-hooks/types/ActionPayloads';

const ParticipantsTabContainer = styled.div`
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 3%;
  width: 100%;
  overflow-y: scroll;
`;

interface ParticipantsTabProps {
  task: Flex.ITask;
  conversation: ConversationState.ConversationState;
}

export const ParticipantsTab = ({ task, conversation }: ParticipantsTabProps) => {
  const [participantDetails, setParticipantDetails] = useState<ParticipantDetails[]>([]);
  const [invitedParticipantDetails, setInvitedParticipantDetails] = useState<InvitedParticipantDetails[]>([]);
  console.log(ParticipantsTabContainer);
  useEffect(() => {
    const updateParticipants = () => {
      getUpdatedParticipantDetails(task, conversation, participantDetails).then((participantDetails) => {
        if (participantDetails) setParticipantDetails(participantDetails);
      });
    };

    updateParticipants();
    setInvitedParticipantDetails(getUpdatedInvitedParticipantDetails(conversation));
  }, [conversation]);

  const handleKickParticipant = (interactionParticipantSid: string) => {
    const payload: RemoveChatParticipantActionPayload = { task, interactionParticipantSid };
    Actions.invokeAction('RemoveChatParticipant', payload);
  };

  const handleCancelInvite = (invitedParticipantDetails: InvitedParticipantDetails) => {
    const payload: CancelChatParticipantInviteActionPayload = {
      conversation,
      invitesTaskSid: invitedParticipantDetails.invitesTaskSid,
    };
    Actions.invokeAction('CancelChatParticipantInvite', payload);
  };

  return (
    <ParticipantsTabContainer>
      {/* <Box as="div"
        margin="auto"
        paddingRight="space60"
    > */}
      <Stack orientation="vertical" spacing="space40">
        <Participants participantDetails={participantDetails} handleKickParticipant={handleKickParticipant} />

        <InvitedParticipants
          invitedParticipantDetails={invitedParticipantDetails}
          handleCancelInvite={handleCancelInvite}
        />
      </Stack>
      {/* </Box> */}
    </ParticipantsTabContainer>
  );
};
