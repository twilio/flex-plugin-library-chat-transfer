import { Actions, Notifications, StateHelper } from '@twilio/flex-ui';

import { TransferActionPayload } from '../types/ActionPayloads';
import { NotificationIds } from '../../flex-hooks/notifications/TransferResult';
import ChatTransferService, { buildInviteParticipantAPIPayload } from '../../helpers/APIHelper';
import { countOfOutstandingInvitesForConversation } from '../../helpers/inviteTracker';

export const handleChatTransferAction = async (payload: TransferActionPayload) => {
  const { task, targetSid } = payload;
  // console.log('transfer', payload);
  const conversation = StateHelper.getConversationStateForTask(task);
  // console.log('conversation', conversation);
  // console.log(
  //   'countOfOutstandingInvitesForConversation(conversation)',
  //   countOfOutstandingInvitesForConversation(conversation),
  // );
  if (conversation && countOfOutstandingInvitesForConversation(conversation) !== 0) {
    Notifications.showNotification(NotificationIds.ChatCancelParticipantInviteFailedInviteOutstanding);
    return;
  }

  const removeInvitingAgent = payload?.options?.mode === 'COLD';
  const transferChatAPIPayload = await buildInviteParticipantAPIPayload(task, targetSid, removeInvitingAgent);
  // console.log(transferChatAPIPayload);
  if (!transferChatAPIPayload) {
    console.log("Passing")

    Notifications.showNotification(NotificationIds.ChatTransferFailedGeneric);
    return;
  }

  // if ((transferChatAPIPayload.workersToIgnore as any).workerSidsInConversation.indexOf(targetSid) >= 0) {
  //   Notifications.showNotification(NotificationIds.ChatTransferFailedAlreadyParticipating);
  //   return;
  // }
  try {
    await ChatTransferService.sendTransferChatAPIRequest(transferChatAPIPayload);
    if (removeInvitingAgent) {
      Notifications.showNotification(NotificationIds.ChatTransferTaskSuccess);
    } else {
      Notifications.showNotification(NotificationIds.ChatParticipantInvited);
    }
  } catch (error) {
    console.error('transfer API request failed', error);
    Notifications.showNotification(NotificationIds.ChatTransferFailedGeneric);
  }
};

export const registerCustomChatTransferAction = () => {
  Actions.registerAction('ChatTransferTask', async (payload: any) =>
    handleChatTransferAction(payload as TransferActionPayload),
  );
};
