import { Actions, Notifications, StateHelper } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui'; 
import { TransferActionPayload } from '../types/ActionPayloads';
import { NotificationIds } from '../../flex-hooks/notifications/TransferResult';
import ChatTransferService, { buildInviteParticipantAPIPayload } from '../../helpers/APIHelper';
import { countOfOutstandingInvitesForConversation } from '../../helpers/inviteTracker';
import { isColdTransferEnabled, isMultiParticipantEnabled } from '../../config';

export const handleChatTransferAction = async (payload: TransferActionPayload) => {
  const { task, targetSid } = payload;
  const conversation = StateHelper.getConversationStateForTask(task);

  if (conversation && countOfOutstandingInvitesForConversation(conversation) !== 0) {
    Flex.Notifications.showNotification(NotificationIds.ChatCancelParticipantInviteFailedInviteOutstanding);
    return;
  }

  if (payload?.options?.mode === 'WARM' && !isMultiParticipantEnabled()) {
    console.log('Warm Transfer Disabled');
    console.log(NotificationIds.ChatTransferFailedConsultNotSupported);
    // Notifications.showNotification(NotificationIds.ChatTransferFailedConsultNotSupported);
    Flex.Notifications.showNotification("Multi Participant is Disabled");
    return;
  }

  if (payload?.options?.mode === 'COLD' && !isColdTransferEnabled()) {
    console.log('Cold Transfer Disabled');
    Flex.Notifications.showNotification(NotificationIds.ChatTransferFailedColdNotSupported);
    return;
  }

  const removeInvitingAgent = payload?.options?.mode === 'COLD';
  const transferChatAPIPayload = await buildInviteParticipantAPIPayload(task, targetSid, removeInvitingAgent);
  if (!transferChatAPIPayload) {
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
      Flex.Notifications.showNotification(NotificationIds.ChatTransferTaskSuccess);
    } else {
      Flex.Notifications.showNotification(NotificationIds.ChatParticipantInvited);
    }
  } catch (error) {
    console.error('transfer API request failed', error);
    Flex.Notifications.showNotification(NotificationIds.ChatTransferFailedGeneric);
  }
};

export const registerCustomChatTransferAction = () => {
  Actions.registerAction('ChatTransferTask', async (payload: any) =>
    handleChatTransferAction(payload as TransferActionPayload),
  );
};
