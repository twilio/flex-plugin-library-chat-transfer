import * as Flex from '@twilio/flex-ui';
import { Tab, TaskHelper } from '@twilio/flex-ui';

import { ParticipantTabLabel } from '../../components/ParticipantTabLabel';
import ParticipantsTab from '../../components/ParticipantsTab';
import { FlexComponent } from '../types/FlexComponent';

interface Props {
  task: Flex.ITask;
}

export const componentName = FlexComponent.TaskCanvasTabs;
export function addParticipantsTab(flex: typeof Flex) {
  // if (!isMultiParticipantEnabled()) return;

  flex.TaskCanvasTabs.Content.add(
    <Tab label={ParticipantTabLabel()} key="participant-tab" uniqueName="ConversationTransferParticipants">
      <ParticipantsTab />
    </Tab>,
    { if: ({ task }: Props) => TaskHelper.isCBMTask(task) && task.status === 'accepted' },
  );
};
