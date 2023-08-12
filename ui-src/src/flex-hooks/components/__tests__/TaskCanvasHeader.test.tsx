/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { addConvTransferButtons } from '../TaskCanvasHeader';
import '@testing-library/jest-dom';
import { TaskCanvasHeader } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui'
jest.mock('@twilio/flex-ui', () => {
    return {
      __esModule: true,
      TaskCanvasHeader: {
        Content: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      },
      Manager: {
        getInstance: jest.fn(),
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

  describe('add transfer button to taskcanvasheader', () => {
    let flex;
    it('add conversation transfer button to taskcanvasheader', async () => {
      const addContentSpy1 = jest.spyOn(TaskCanvasHeader.Content, 'add');
      const addContentSpy2 = jest.spyOn(TaskCanvasHeader.Content, 'remove');
      addConvTransferButtons(flex);
      expect(addContentSpy1).toHaveBeenCalledTimes(2);
      expect(addContentSpy2).toHaveBeenCalledTimes(1);
    });
  });
  