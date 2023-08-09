/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { addParticipantsTab } from '../TaskCanvasTabs';
import '@testing-library/jest-dom';
import { TaskCanvasTabs } from '@twilio/flex-ui';

jest.mock('@twilio/flex-ui', () => {
    return {
      __esModule: true,
      TaskCanvasTabs: {
        Content: {
          add: jest.fn(),
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

  describe('add transfer button', () => {
    let flex;
    it('add conversation transfer button to taskcanvasheader', async () => {
      const addContentSpy = jest.spyOn(TaskCanvasTabs.Content, 'add');
      addParticipantsTab(flex);
      await expect(addContentSpy).toHaveBeenCalledTimes(1);
    });
  });
  