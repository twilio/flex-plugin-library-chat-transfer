/* eslint-disable prettier/prettier */
import React from 'react';

import { useState, useEffect } from 'react';
import { IconButton, ITask, Actions } from '@twilio/flex-ui';
import { Box } from '@twilio-paste/core';
import { TransferActionPayload } from '../../flex-hooks/types/ActionPayloads';

interface TransferButtonProps {
  task: ITask;
}

const TransferButton = ({ task }: TransferButtonProps) => {
  // All we are doing here is making sure we disable the transfer button after it is clicked for a cold transfer
  // There is additional complexity as we only want to disable it for the task they click transfer on
  const [disableTransferButtonForTask, setDisableTransferButtonForTask] = useState(false);
  const [taskSidsTransfered, setTaskSidsTransfered] = useState<string[]>([]);

  // if there is a transfer task event for this chat disable the transfer button while the request is made
  const handleTransferInitiated = (payload: TransferActionPayload) => {
    if (payload.task.sid === task.sid) {
      setTaskSidsTransfered((taskSidsTransfered) => [...taskSidsTransfered, task.sid]);
    }
  };

  // if there is a transfer task event for this chat re-enable the transfer button afterwards
  const handleTransferCompleted = (payload: TransferActionPayload) => {
    if (payload.task.sid === task.sid) {
      setTaskSidsTransfered((taskSidsTransfered) => taskSidsTransfered.filter((item) => item !== task.sid));
    }
  };

  // only listen for transfer task events when mounted and make sure we clean up the listener
  useEffect(() => {
    Actions.addListener('beforeChatTransferTask', handleTransferInitiated);
    Actions.addListener('afterChatTransferTask', handleTransferCompleted);
    return () => {
      Actions.removeListener('beforeChatTransferTask', handleTransferInitiated);
      Actions.removeListener('afterChatTransferTask', handleTransferCompleted);
    };
  }, []);

  // if the selected task changes or we update the list of transferred tasks check if should disable buttons
  useEffect(() => {
    setDisableTransferButtonForTask(taskSidsTransfered.includes(task.sid));
  }, [task.sid, taskSidsTransfered]);

  const onShowDirectory = () => {
    Actions.invokeAction('ShowDirectory');
  };

  return (
    <Box as="div"
        margin="auto"
        paddingRight="space60"
    >
      <IconButton
        icon="TransferLarge"
        key="worker-directory-open"
        disabled={disableTransferButtonForTask}
        onClick={onShowDirectory}
        variant="secondary"
        title="ConvTransferTransferChat"
      />
    </Box>
  );
};

export default TransferButton;
