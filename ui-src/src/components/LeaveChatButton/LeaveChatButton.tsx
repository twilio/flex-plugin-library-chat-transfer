import { Button, ConversationState, Actions, Template, templates } from '@twilio/flex-ui';
import { useState } from 'react';

import React from 'react';

import { LeaveChatActionPayload } from '../../flex-hooks/types/ActionPayloads';

export interface LeaveChatButtonProps {
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
      {' '}
    </Button>
  );
};

export default LeaveChatButton;
