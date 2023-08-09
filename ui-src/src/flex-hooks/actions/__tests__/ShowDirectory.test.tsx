import { actionHook } from '../ShowDirectory';

import * as Flex from '@twilio/flex-ui';

describe('add transfer button', () => {
  const flex: typeof Flex = Flex;
  const manager: Flex.Manager = Flex.Manager.getInstance();
  it('add transfer button to taskcanvasheader', async () => {
    const listenerSpy = jest.spyOn(Flex.Actions, 'addListener');
    actionHook(flex, manager);
    expect(listenerSpy).toHaveBeenCalledTimes(1);
  });
});