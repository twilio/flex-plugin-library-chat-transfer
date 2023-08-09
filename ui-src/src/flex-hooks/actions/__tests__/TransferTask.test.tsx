import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Actions } from '@twilio/flex-ui';

import { actionHook } from '../TransferTask'; // Update this import based on your file structure

jest.mock('@twilio/flex-ui', () => {
  return {
    __esModule: true,
    Actions: {
      addListener: jest.fn(),
    },
  };
});

describe('add transfer button', () => {
  let flex;
  it('add transfer button to taskcanvasheader', async () => {
    const addContentSpy = jest.spyOn(Actions, 'addListener');
    actionHook(flex);
    expect(addContentSpy).toHaveBeenCalledTimes(1);
  });
});
