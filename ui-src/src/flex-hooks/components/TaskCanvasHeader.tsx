import * as Flex from '@twilio/flex-ui';
import { ITask, TaskHelper, StateHelper } from '@twilio/flex-ui';
import React from 'react';
import TransferButton from '../../components/TransferButton';
import LeaveChatButton from '../../components/LeaveChatButton';
import { countOfOutstandingInvitesForConversation } from '../../helpers/inviteTracker';
import { FlexComponent } from '../types/FlexComponent';
import { isColdTransferEnabled, isMultiParticipantEnabled } from '../../config';

interface Props {
  task: ITask;
}

export const componentName = FlexComponent.TaskCanvasHeader;
export function addConvTransferButtons(flex: typeof Flex) {
  console.log('Task Canvas Header is getting executed');
  if (!isColdTransferEnabled() && !isMultiParticipantEnabled()) return;
  Flex.TaskCanvasHeader.Content.add(<TransferButton key="conversation-transfer-button" />, {
    sortOrder: 1,
    if: ({ task }) => TaskHelper.isCBMTask(task) && task.taskStatus === 'assigned',
  });
}
