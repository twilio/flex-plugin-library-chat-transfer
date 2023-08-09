/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Button, ConversationState, Actions, Template, templates } from '@twilio/flex-ui';
import LeaveChatButton from '../LeaveChatButton';

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

  it.only('should render correct snapshot', () => {
    const mockConversation = { value: "true" } as unknown as ConversationState.ConversationState;
    const wrapper = render(<LeaveChatButton conversation={mockConversation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
