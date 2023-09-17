import * as Flex from '@twilio/flex-ui';

import { FlexActionEvent, FlexAction } from '../types/FlexAction';

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.ShowDirectory;
export const actionHook = function handleConvTransferShowDirectory(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, (_payload: any, _abortFunction: any) => {
    const display = 'flex';

    const taskSid = manager.store.getState().flex.view.selectedTaskSid;
    if (!taskSid) return;

    manager.updateConfig({
      theme: {
        componentThemeOverrides: {
          WorkerDirectory: {
            Container: {
              '.Twilio-WorkerDirectory-ButtonContainer': {
                '&>:nth-child(1)': {
                  display: display,
                },
                '&>:nth-child(2)': {
                  display: display,
                },
              },
            },
          },
        },
      },
    });
  });
};
