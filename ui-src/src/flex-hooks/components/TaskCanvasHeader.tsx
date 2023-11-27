import * as Flex from '@twilio/flex-ui';
import { ITask, TaskHelper } from '@twilio/flex-ui';
import React from 'react';
import TransferButton from '../../components/TransferButton';
import { FlexComponent } from '../types/FlexComponent';
import { isColdTransferEnabled, isMultiParticipantEnabled } from '../../config';

export const componentName = FlexComponent.TaskCanvasHeader;
export function addConvTransferButtons(flex: typeof Flex) {
  if (!isColdTransferEnabled() && !isMultiParticipantEnabled()) return;
  Flex.TaskCanvasHeader.Content.add(<TransferButton key="conversation-transfer-button" />, {
    sortOrder: 1,
    if: ({ task }) => TaskHelper.isCBMTask(task) && task.taskStatus === 'assigned',
  });
}
