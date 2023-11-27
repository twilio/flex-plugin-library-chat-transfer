import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../types/FlexComponent';

export const componentName = FlexComponent.WorkerDirectory;
export function removeDialpadForConvTransfer(flex: typeof Flex) {
  // remove existing dialpad tab
  Flex.WorkerDirectory.Tabs.Content.remove('directory', {
    if: ({ task }) => task && Flex.TaskHelper.isCBMTask(task),
  });
};
