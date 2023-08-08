import * as Flex from '@twilio/flex-ui';
import { actionHook } from '../ShowDirectory';
import { FlexActionEvent, FlexAction } from '../../types/FlexAction';

// Mocking Flex and Manager objects for testing
const mockFlex = {
  Actions: { addListener: jest.fn() },
  TaskHelper: { isCBMTask: jest.fn(), getTaskByTaskSid: jest.fn() },
};
const mockManager = {
  store: {
    getState: jest.fn(() => ({
      flex: { view: { selectedTaskSid: 'mockTaskSid' } },
      featureFlags: { features: { 'flex-warm-transfers': { enabled: true } } },
    })),
  },
  updateConfig: jest.fn(),
};

describe('handleConvTransferShowDirectory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a listener for the action event', () => {
    actionHook(mockFlex as unknown as typeof Flex, mockManager as unknown as Flex.Manager);

    expect(mockFlex.Actions.addListener).toHaveBeenCalledWith(
      `${FlexActionEvent.before}${FlexAction.ShowDirectory}`,
      expect.any(Function),
    );
  });

  it('should update config with correct display values when isCbm is true', () => {
    mockFlex.TaskHelper.isCBMTask.mockReturnValue(true);

    actionHook(mockFlex as unknown as typeof Flex, mockManager as unknown as Flex.Manager);
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

  it('should update config with correct display values when isCbm is false', () => {
    mockFlex.TaskHelper.isCBMTask.mockReturnValue(false);
    actionHook(mockFlex as unknown as typeof Flex, mockManager as unknown as Flex.Manager);
  });
});
