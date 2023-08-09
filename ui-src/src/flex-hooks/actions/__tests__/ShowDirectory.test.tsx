import { actionHook } from '../ShowDirectory';

import * as Flex from '@twilio/flex-ui';

const mockManager = {
  store: {
    getState: () => ({
      flex: {
        view: {
          selectedTaskSid: 'task123',
        },
      },
    }),
  },
  updateConfig: jest.fn(),
};

const mockFlex = {
  Actions: {
    addListener: jest.fn(),
  },
};

describe('add transfer button', () => {
  const flex: typeof Flex = Flex;
  const manager: Flex.Manager = Flex.Manager.getInstance();
  it('add transfer button to taskcanvasheader', async () => {
    const listenerSpy = jest.spyOn(Flex.Actions, 'addListener');
    actionHook(flex, manager);
    expect(listenerSpy).toHaveBeenCalledTimes(1);
  });
  it('updates the config when listener is triggered', () => {
    actionHook(mockFlex, mockManager);

    // Get the callback function registered in the addListener call
    const listenerCallback = mockFlex.Actions.addListener.mock.calls[0][1];

    // Call the listener callback with mock payload and abortFunction
    listenerCallback({}, jest.fn());

    // Check if updateConfig was called with the correct arguments
    expect(mockManager.updateConfig).toHaveBeenCalledWith({
      theme: {
        componentThemeOverrides: {
          WorkerDirectory: {
            Container: {
              '.Twilio-WorkerDirectory-ButtonContainer': {
                '&>:nth-child(1)': {
                  display: 'flex',
                },
                '&>:nth-child(2)': {
                  display: 'flex',
                },
              },
            },
          },
        },
      },
    });
  });
});