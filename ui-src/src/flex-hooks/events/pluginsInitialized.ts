import { registerCustomChatTransferAction } from '../actions/chatTransferTask';
import { registerLeaveChatAction } from '../actions/leaveChat';
import { registerRemoveChatParticipant } from '../actions/removeChatParticipant';
import { registerCancelChatParticipantInvite } from '../actions/cancelChatParticipantInvite';
import { FlexEvent } from '../types/FlexEvent';

export const eventName = FlexEvent.pluginsInitialized;
export const eventHook = () => {
  // const coldTransferEnabled = isColdTransferEnabled();
  // const multiParticipantEnabled = isMultiParticipantEnabled();

  // if (!(coldTransferEnabled || multiParticipantEnabled)) return;

  // console.log(
  //   `Feature conversation-transfer settings: cold_transfer=${coldTransferEnabled} multi_participant=${multiParticipantEnabled}`,
  // );
  registerCustomChatTransferAction();
  registerLeaveChatAction();
  registerRemoveChatParticipant();
  registerCancelChatParticipantInvite();
};
