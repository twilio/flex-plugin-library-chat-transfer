/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Button, ConversationState, Actions, Template, templates } from '@twilio/flex-ui';
import LeaveChatButton, { LeaveChatButtonProps } from '../LeaveChatButton';

jest.mock('@twilio/flex-ui', () => ({
  Actions: {
    invokeAction: jest.fn(),
  },
}));

describe('LeaveChatButton', () => {
  const mockConversation = {} as unknown as ConversationState.ConversationState;

  it('calls Actions.invokeAction when the button is clicked', async () => {
    const { getByRole } = render(<LeaveChatButton conversation={mockConversation} />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(Actions.invokeAction).toHaveBeenCalledWith('LeaveChat', {
      conversation: mockConversation,
    });
  });

  it('disables the button while invoking action', async () => {
    const { getByRole } = render(<LeaveChatButton conversation={mockConversation} />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(button).toBeDisabled();

    const asyncActionCompletion = new Promise((resolve) => setTimeout(resolve, 100));
    Actions.invokeAction.mockReturnValue(asyncActionCompletion);

    await waitFor(() => expect(button).not.toBeDisabled());
  });

  // it.only('should render correct snapshot', () => {
  //   // const mockConversation = { key: 'value' } as unknown as ConversationState.ConversationState;
  //   const mockConversation = {
  //     conversation: {
  //       isLoadingMessages: true,
  //       isLoadingParticipants: true,
  //       lastReadMessageIndex: 1,
  //       lastReadMessageByCurrentUserIndex: 1,
  //       participants: {},
  //       unreadMessages: [],
  //       messages: [],
  //       pendingMessages: [],
  //       typers: [],
  //       isLoadingConversation: true,
  //       errorWhileLoadingConversation: true,
  //       showScrollDownBtn: true,
  //       lastScrollPosition: 2,
  //     },
  //   } as unknown as LeaveChatButtonProps;
  //   const wrapper = render(<LeaveChatButton {...mockConversation} />);
  //   expect(wrapper).toMatchSnapshot();
  // });
});
