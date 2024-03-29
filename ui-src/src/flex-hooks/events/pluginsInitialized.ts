import { registerCustomChatTransferAction } from '../actions/chatTransferTask';
import { registerLeaveChatAction } from '../actions/leaveChat';
import { registerRemoveChatParticipant } from '../actions/removeChatParticipant';
import { registerCancelChatParticipantInvite } from '../actions/cancelChatParticipantInvite';
import { FlexEvent } from '../types/FlexEvent';
import { isColdTransferEnabled, isMultiParticipantEnabled } from '../../config';
import ConversationTransferNotification from '../../flex-hooks/notifications/TransferResult';


export const eventName = FlexEvent.pluginsInitialized;
export const eventHook = () => {
  const coldTransferEnabled = isColdTransferEnabled();
  const multiParticipantEnabled = isMultiParticipantEnabled();

  if (!(coldTransferEnabled || multiParticipantEnabled)) return;
  ConversationTransferNotification;
  registerCustomChatTransferAction();
  registerLeaveChatAction();
  registerRemoveChatParticipant();
  registerCancelChatParticipantInvite();
};
