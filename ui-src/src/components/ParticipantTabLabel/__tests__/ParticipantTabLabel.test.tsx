import React from 'react';
import { render } from '@testing-library/react';
import { TaskContext, Template } from '@twilio/flex-ui';
import { ParticipantTabLabelContainer } from '../ParticipantTabLabel';

describe('ParticipantTabLabelContainer', () => {
  it('displays the participant count from TaskContext', () => {
    const participantCount = 3;
    const contextMock = {
      conversation: {
        participants: {
          size: participantCount,
        },
      },
    };

    const { getByText } = render(
      <TaskContext.Provider value={contextMock}>
        <ParticipantTabLabelContainer />
      </TaskContext.Provider>,
    );

    const participantBadge = getByText(participantCount.toString());
    expect(participantBadge).toBeInTheDocument();
  });

  it.only('displays zero participant count when TaskContext is not provided', () => {
    const { getByText } = render(<ParticipantTabLabelContainer />);
    const participantBadge = getByText('0');
    expect(participantBadge).toBeInTheDocument();
  });

  it('should render correct snapshot', () => {
    const wrapper = render(
      <TaskContext.Consumer>{(context) => <ParticipantTabLabelContainer context={context} />}</TaskContext.Consumer>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
