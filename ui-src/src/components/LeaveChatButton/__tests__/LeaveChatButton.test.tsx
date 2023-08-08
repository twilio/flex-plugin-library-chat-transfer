import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional DOM matchers
import LeaveChatButton from '../LeaveChatButton';
import { Actions } from '@twilio/flex-ui';

jest.mock('@twilio/flex-ui', () => {
    return {
      __esModule: true,
      Actions: {
        invokeAction: jest.fn(),
      },
    };
  });

describe('LeaveChatButton', () => {
  it('should be enabled and call Actions.invokeAction when clicked', async () => {
    const conversation = { id: 'conversation-id' };

    render(<LeaveChatButton conversation={conversation} />);

    const buttonElement = screen.getByRole('button', { name: 'Leave Chat' });
    expect(buttonElement).toBeEnabled();

    fireEvent.click(buttonElement);

    expect(buttonElement).toBeDisabled();

    await waitFor(() => expect(Actions.invokeAction).toHaveBeenCalledTimes(1));

    const expectedPayload = { conversation };
    expect(Actions.invokeAction).toHaveBeenCalledWith('LeaveChat', expectedPayload);

    expect(buttonElement).toBeEnabled();
  });

  it('should do nothing when conversation prop is not provided', async () => {
    render(<LeaveChatButton />);

    const buttonElement = screen.getByRole('button', { name: 'Leave Chat' });
    expect(buttonElement).toBeEnabled();

    fireEvent.click(buttonElement);

    await waitFor(() => expect(Actions.invokeAction).not.toHaveBeenCalled());

    expect(buttonElement).toBeEnabled();
    expect(Actions.invokeAction).not.toHaveBeenCalled();
  });
});
