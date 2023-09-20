import * as Flex from '@twilio/flex-ui';

import { isColdTransferEnabled, isMultiParticipantEnabled } from '../../config';

import { TransferActionPayload } from '../types/ActionPayloads';
import { FlexActionEvent, FlexAction } from '../types/FlexAction';

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.TransferTask;
// invoke the custom chatTransferTask action if a cbm task otherwise carry on
export const actionHook = function handleConvTransfer(flex: typeof Flex) {
  console.log('Transfer Task is getting executed');

  if (!isColdTransferEnabled() && !isMultiParticipantEnabled()) return;

  Flex.Actions.addListener(`${actionEvent}${actionName}`, (payload: TransferActionPayload, abortFunction: any) => {
    if (Flex.TaskHelper.isCBMTask(payload.task)) {
      // native action handler would fail for chat task so abort the action
      abortFunction();
      // Execute Chat Transfer Task
      Flex.Actions.invokeAction('ChatTransferTask', payload);
    }
  });
};
