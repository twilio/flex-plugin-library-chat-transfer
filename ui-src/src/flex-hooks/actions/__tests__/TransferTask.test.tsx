import * as Flex from '@twilio/flex-ui';
import { actionHook } from '../TransferTask'; // Update this import based on your file structure

describe('handleConvTransfer', () => {
  let flexActionsAddListenerMock;
  let flexActionsInvokeActionMock;
  let isCBMTaskMock;
  let transferActionPayload;
  let abortFunctionMock;

  beforeEach(() => {
    flexActionsAddListenerMock = jest.spyOn(Flex.Actions, 'addListener');
    flexActionsInvokeActionMock = jest.spyOn(Flex.Actions, 'invokeAction');
    isCBMTaskMock = jest.spyOn(Flex.TaskHelper, 'isCBMTask');
    transferActionPayload = {
      task: {}, // Provide a mock task object
    };
    abortFunctionMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call invokeAction and abortFunction for CBM task', () => {
    isCBMTaskMock.mockReturnValue(true);

    actionHook(Flex);

    const event = 'beforeTransferTask';
    const action = 'TransferTask';

    expect(flexActionsAddListenerMock).toHaveBeenCalledWith(`${event}${action}`, expect.any(Function));

    const eventHandler = flexActionsAddListenerMock.mock.calls[0][1];
    eventHandler(transferActionPayload, abortFunctionMock);

    expect(isCBMTaskMock).toHaveBeenCalledWith(transferActionPayload.task);
    expect(abortFunctionMock).toHaveBeenCalledTimes(1);
    expect(flexActionsInvokeActionMock).toHaveBeenCalledWith('ChatTransferTask', transferActionPayload);
  });

  it('should not call invokeAction and abortFunction for non-CBM task', () => {
    isCBMTaskMock.mockReturnValue(false);

    actionHook(Flex);

    const event = 'beforeTransferTask';
    const action = 'TransferTask';

    expect(flexActionsAddListenerMock).toHaveBeenCalledWith(`${event}${action}`, expect.any(Function));

    const eventHandler = flexActionsAddListenerMock.mock.calls[0][1];
    eventHandler(transferActionPayload, abortFunctionMock);

    expect(isCBMTaskMock).toHaveBeenCalledWith(transferActionPayload.task);
    expect(abortFunctionMock).not.toHaveBeenCalled();
    expect(flexActionsInvokeActionMock).not.toHaveBeenCalled();
  });
});
