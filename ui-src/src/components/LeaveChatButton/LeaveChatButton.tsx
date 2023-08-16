import { Button, ConversationState, Actions, Template, templates } from '@twilio/flex-ui';
import { useState } from 'react';

import React from 'react';

import { LeaveChatActionPayload } from '../../flex-hooks/types/ActionPayloads';
import { StringTemplates } from '../../flex-hooks/strings/ChatTransferStrings';

interface LeaveChatButtonProps {
  conversation: ConversationState.ConversationState;
}

const LeaveChatButton = ({ conversation }: LeaveChatButtonProps) => {
  const [buttonDisabled, setButtonDisable] = useState(false);
  const handleLeaveChatClick = async () => {
    if (conversation) {
      setButtonDisable(true);
      const payload: LeaveChatActionPayload = { conversation };
      await Actions.invokeAction('LeaveChat', payload);
      setButtonDisable(false);
    }
  };
  return (
    <Button
      variant="primary"
      className="Twilio-TaskCanvasHeader-EndButton"
      size="small"
      onClick={handleLeaveChatClick}
      disabled={buttonDisabled}
      title="ConvTransferLeaveChat"
    >
      {/* <Template source={templates[StringTemplates.LeaveChat]} /> */}
    </Button>
  );
};

export default LeaveChatButton;
