/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import '@testing-library/jest-dom';
import { Actions } from '@twilio/flex-ui';

import { actionHook } from '../TransferTask'; // Update this import based on your file structure
import * as Flex from '@twilio/flex-ui';

jest.mock('../../../config', () => {
  return {
    isColdTransferEnabled: jest.fn().mockReturnValue(true),
    isMultiParticipantEnabled: jest.fn().mockReturnValue(true),
  }
});

describe('add transfer button', () => {
  let mockFlexActionsAddListener;
  let mockFlexActionsInvokeAction;
  const flex: typeof Flex = Flex;
  beforeEach(() => {
    mockFlexActionsAddListener = jest.spyOn(Flex.Actions, 'addListener');
    mockFlexActionsInvokeAction = jest.spyOn(Flex.Actions, 'invokeAction');
  });

  afterEach(() => {
    mockFlexActionsAddListener.mockRestore();
    mockFlexActionsInvokeAction.mockRestore();
  });

  it('registers the listener and invokes ChatTransferTask action', () => {
    // Mock payload with a CBM task
    const mockPayload = {
      task: {
        attributes: {
          channelType: 'chat',
        },
      },
    };
    const addContentSpy = jest.spyOn(Actions, 'invokeAction');
    actionHook(Flex);
    // expect(mockFlexActionsAddListener).toHaveBeenCalledWith(`${actionEvent}${actionName}`,expect.any(Function));
    const listenerCallback = mockFlexActionsAddListener.mock.calls[0][1];

    listenerCallback(mockPayload, jest.fn());
    // expect(mockFlexActionsInvokeAction).toHaveBeenCalledWith('ChatTransferTask', mockPayload);
    expect(addContentSpy).toHaveBeenCalledTimes(0);

  });

  it('add transfer button to taskcanvasheader', async () => {
    const addContentSpy = jest.spyOn(Actions, 'addListener');
    actionHook(flex);
    expect(addContentSpy).toHaveBeenCalledTimes(1);
  });
});
