import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LeaveChatButton from './../LeaveChatButton'; // Update the import path as needed

// Mock the necessary dependencies
jest.mock('@twilio/flex-ui', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Actions: {
    invokeAction: jest.fn(),
  },
}));


describe('LeaveChatButton', () => {
  it('should render the button', () => {
    const wrapper = render(<LeaveChatButton conversation={{key : 'value'}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
