import * as Flex from '@twilio/flex-ui';
import { removeDialpadForConvTransfer } from '../WorkerDirectory';
import React from 'react';
import '@testing-library/jest-dom';
import { WorkerDirectory } from '@twilio/flex-ui';

jest.mock('@twilio/flex-ui', () => {
  return {
    __esModule: true,
    WorkerDirectory: {
      Tabs: {
        Content: {
          remove: jest.fn(),
        }
      },
    },
    withTaskContext: (WrappedComponent) => {
      return () => ({
        render() {
          return <WrappedComponent />;
        },
      });
    },
  };
});

describe('remove existing dialpad tab', () => {
  let flex;
  it('remove existing dialpad tab', async () => {
    const addContentSpy = jest.spyOn(WorkerDirectory.Tabs.Content, 'remove');
    removeDialpadForConvTransfer(flex);
    expect(addContentSpy).toHaveBeenCalledTimes(1);
  });
});