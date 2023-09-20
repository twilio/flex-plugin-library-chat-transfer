import { Actions, Notifications, StateHelper } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui';
import { TransferActionPayload } from '../types/ActionPayloads';
import { NotificationIds } from '../../flex-hooks/notifications/TransferResult';
import ChatTransferService, { buildInviteParticipantAPIPayload } from '../../helpers/APIHelper';
import { countOfOutstandingInvitesForConversation } from '../../helpers/inviteTracker';
import { isColdTransferEnabled, isMultiParticipantEnabled } from '../../config';
import Analytics, { Event } from '../../utils/Analytics';

export const handleChatTransferAction = async (payload: TransferActionPayload) => {
  const { task, targetSid } = payload;
  const isWorkerSid = targetSid.startsWith('WK');
  const conversation = StateHelper.getConversationStateForTask(task);

  if (conversation && countOfOutstandingInvitesForConversation(conversation) !== 0) {
    Notifications.showNotification(NotificationIds.ChatCancelParticipantInviteFailedInviteOutstanding);
    return;
  }

  if (payload?.options?.mode === 'WARM' && !isMultiParticipantEnabled()) {
    Notifications.showNotification(NotificationIds.ChatTransferFailedConsultNotSupported);
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

  try {
    await ChatTransferService.sendTransferChatAPIRequest(transferChatAPIPayload);
    if (removeInvitingAgent) {
      Flex.Notifications.showNotification(NotificationIds.ChatTransferTaskSuccess);
      Analytics.track(Event.CHAT_TRANSFERRED_COLD, {
        [isWorkerSid ? 'toAgentSid' : 'toQueueSid']: payload.targetSid,
      });
    } else {
      Flex.Notifications.showNotification(NotificationIds.ChatParticipantInvited);
      Analytics.track(Event.CHAT_TRANSFERRED_WARM, {
        [isWorkerSid ? 'toAgentSid' : 'toQueueSid']: payload.targetSid,
      });
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