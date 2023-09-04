import { NotificationType } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui';

import { StringTemplates } from '../strings/ChatTransferStrings';

export enum NotificationIds {
  ChatTransferTaskSuccess = 'ChatTransferTaskSuccess',
  ChatParticipantInvited = 'ChatParticipantInvited',
  ChatTransferFailedGeneric = 'ChatTransferFailed',
  ChatTransferFailedConsultNotSupported = 'ChatTransferFailedConsultNotSupported',
  ChatTransferFailedColdNotSupported = 'ChatTransferFailedColdNotSupported',
  ChatTransferFailedAlreadyParticipating = 'ChatTransferFailedAlreadyParticipating',
  ChatRemoveParticipantFailed = 'ChatRemoveParticipantFailed',
  ChatRemoveParticipantSuccess = 'ChatRemoveParticipantSuccess',
  ChatCancelParticipantInviteFailed = 'ChatCancelParticipantInviteFailed',
  ChatCancelParticipantInviteSuccess = 'ChatCancelParticipantInviteSuccess',
  ChatCancelParticipantInviteFailedInviteOutstanding = 'ChatCancelParticipantInviteFailedInviteOutstanding',
}

export default (flex: typeof Flex) => {
  flex.Notifications.registerNotification({
    id: NotificationIds.ChatTransferTaskSuccess,
    closeButton: true,
    content: StringTemplates.ChatTransferTaskSuccess,
    type: NotificationType?.success,
    timeout: 3000,
  });
  flex.Notifications.registerNotification({
    id: NotificationIds.ChatParticipantInvited,
    closeButton: true,
    content: StringTemplates.ChatParticipantInvited,
    type: NotificationType?.success,
    timeout: 3000,
  });
  flex.Notifications.registerNotification({
    id: NotificationIds.ChatTransferFailedGeneric,
    closeButton: true,
    content: StringTemplates.ChatTransferFailedGeneric,
    type: NotificationType?.error,
    timeout: 3000,
  });
  flex.Notifications.registerNotification({
    id: NotificationIds.ChatTransferFailedConsultNotSupported,
    closeButton: true,
    content: StringTemplates.ChatTransferFailedConsultNotSupported,
    type: NotificationType?.warning,
    timeout: 3000,
  });
  flex.Notifications.registerNotification({
    id: NotificationIds.ChatTransferFailedColdNotSupported,
    closeButton: true,
    content: StringTemplates.ChatTransferFailedColdNotSupported,
    type: NotificationType?.warning,
    timeout: 3000,
  });
  flex.Notifications.registerNotification({
    id: NotificationIds.ChatTransferFailedAlreadyParticipating,
    closeButton: true,
    content: StringTemplates.ChatTransferFailedAlreadyParticipating,
    type: NotificationType?.error,
    timeout: 3000,
  });
  flex.Notifications.registerNotification({
    id: NotificationIds.ChatRemoveParticipantFailed,
    closeButton: true,
    content: StringTemplates.ChatRemoveParticipantFailed,
    type: NotificationType?.error,
    timeout: 3000,
  });
};