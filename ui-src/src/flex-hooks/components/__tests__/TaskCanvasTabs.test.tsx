/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { addParticipantsTab } from '../TaskCanvasTabs';
import '@testing-library/jest-dom';
import { TaskCanvasTabs } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui';


jest.mock('@twilio-paste/icons/esm/UserIcon', () => {
  const icons1 = <div />
});

jest.mock('@twilio-paste/icons/esm/AgentIcon', () => {
  const icons2 = <div />
});

jest.mock('@twilio-paste/icons/esm/CloseIcon', () => {
  const icons3 = <div />
});

jest.mock('@twilio-paste/icons/esm/ChatIcon', () => {
  const icons4 = <div />
});

jest.mock('@twilio/flex-ui', () => {
    return {
      __esModule: true,
      TaskCanvasTabs: {
        Content: {
          add: jest.fn(),
        },
      },
      
    };
  });

  describe('add transfer button', () => {
    // const manager: Flex.Manager = Flex.Manager.getInstance();
    let flex;
    it('add conversation transfer button to taskcanvasheader', async () => {
      const addContentSpy = jest.spyOn(TaskCanvasTabs.Content, 'add');
      addParticipantsTab(flex);
      await expect(addContentSpy).toHaveBeenCalledTimes(1);
    });
  });
  