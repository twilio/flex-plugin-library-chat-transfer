import React from 'react';
import { render } from '@testing-library/react';
import { TaskContext, Template } from '@twilio/flex-ui';
import { ParticipantTabLabelContainer } from '../ParticipantTabLabel';

describe('ParticipantTabLabelContainer', () => {
  const mockParticipantsSize = 3; // You can adjust this value based on your test case

  it.only('renders the participant count correctly', () => {
    const mockConversation = {
      participants: new Set(Array(mockParticipantsSize).fill(null)),
    };

    const mockContext = {
      conversation: mockConversation,
    };

    const { getByText } = render(
      <TaskContext.Consumer>
        {(mockContext) => <ParticipantTabLabelContainer context={mockContext} />}
      </TaskContext.Consumer>,
    );

    const participantsLabel = getByText('Participants:');
    expect(participantsLabel).toBeInTheDocument();

    const participantCountBadge = getByText(mockParticipantsSize.toString());
    expect(participantCountBadge).toBeInTheDocument();
  });

  it('renders without crashing when conversation is not provided', () => {
    const mockContext = {
      conversation: null,
    };

    const { container } = render(
      <TaskContext.Provider value={mockContext}>
        <ParticipantTabLabelContainer />
      </TaskContext.Provider>,
    );

    expect(container).toBeDefined();
  });

  it('should render correct snapshot', () => {
    const wrapper = render(
      <TaskContext.Consumer>{(context) => <ParticipantTabLabelContainer context={context} />}</TaskContext.Consumer>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
