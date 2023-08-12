import * as Flex from '@twilio/flex-ui';
import { ITask, TaskHelper, StateHelper } from '@twilio/flex-ui';
import React from 'react';
import TransferButton from '../../components/TransferButton';
import LeaveChatButton from '../../components/LeaveChatButton';
import { countOfOutstandingInvitesForConversation } from '../../helpers/inviteTracker';
import { FlexComponent } from '../types/FlexComponent';

interface Props {
  task: ITask;
}

export const componentName = FlexComponent.TaskCanvasHeader;
export function addConvTransferButtons(flex: typeof Flex) {
  // if (!isColdTransferEnabled() && !isMultiParticipantEnabled()) return;

  Flex.TaskCanvasHeader.Content.add(<TransferButton key="conversation-transfer-button" />, {
    sortOrder: 1,
    if: ({ task }) => TaskHelper.isCBMTask(task) && task.taskStatus === 'assigned',
  });

  // if (!isMultiParticipantEnabled()) return;

  const replaceEndTaskButton = (task: ITask) => {
    if (TaskHelper.isCBMTask(task) && task.taskStatus === 'assigned') {
      // more than two participants or are there any active invites?
      const conversationState = StateHelper.getConversationStateForTask(task);
      if (
        conversationState &&
        (conversationState.participants.size > 2 || countOfOutstandingInvitesForConversation(conversationState))
      ) {
        return true;
      }
    }
    return false;
  };

  // Flex.TaskCanvasHeader.Content.add(<LeaveChatButton key="leave-chat" />, {
  //   if: ({ task }: Props) => replaceEndTaskButton(task),
  // });

  // Flex.TaskCanvasHeader.Content.remove('actions', { if: ({ task }: Props) => replaceEndTaskButton(task) });
};
