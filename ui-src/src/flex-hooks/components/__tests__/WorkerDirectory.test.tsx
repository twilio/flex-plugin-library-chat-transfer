import * as Flex from '@twilio/flex-ui';
import { removeDialpadForConvTransfer } from '../WorkerDirectory';

describe('removeDialpadForConvTransfer', () => {
  let flexWorkerDirectoryTabsContentRemoveMock;
  let isCBMTaskMock;
  let mockTask;

  beforeEach(() => {
    flexWorkerDirectoryTabsContentRemoveMock = jest.spyOn(Flex.WorkerDirectory.Tabs.Content, 'remove');
    isCBMTaskMock = jest.spyOn(Flex.TaskHelper, 'isCBMTask');
    mockTask = { /* Provide a mock task object */ };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove dialpad tab for CBM task', () => {
    isCBMTaskMock.mockReturnValue(true);

    removeDialpadForConvTransfer(Flex);

    expect(flexWorkerDirectoryTabsContentRemoveMock).toHaveBeenCalledWith('directory', {
      if: expect.any(Function),
    });

    const conditionFn = flexWorkerDirectoryTabsContentRemoveMock.mock.calls[0][1].if;
    expect(conditionFn({ task: mockTask })).toBe(true);
  });

  it('should not remove dialpad tab for non-CBM task', () => {
    isCBMTaskMock.mockReturnValue(false);

    removeDialpadForConvTransfer(Flex);

    expect(flexWorkerDirectoryTabsContentRemoveMock).toHaveBeenCalledWith('directory', {
      if: expect.any(Function),
    });

    const conditionFn = flexWorkerDirectoryTabsContentRemoveMock.mock.calls[0][1].if;
    expect(conditionFn({ task: mockTask })).toBe(false);
  });
});
