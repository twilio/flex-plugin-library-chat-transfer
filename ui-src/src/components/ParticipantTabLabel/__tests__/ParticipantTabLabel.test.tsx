import React from 'react';
import { render } from '@testing-library/react';
import { TaskContext, Template } from '@twilio/flex-ui';
import { ParticipantTabLabelContainer } from '../ParticipantTabLabel';

describe('ParticipantTabLabelContainer', () => {
  it('displays zero participant count when TaskContext is not provided', () => {
    const { getByText } = render(<ParticipantTabLabelContainer />);
    const participantBadge = getByText('0');
    expect(participantBadge).toBeInTheDocument();
  });

  it.only('should render correct snapshot', () => {
    const wrapper = render(
      <TaskContext.Consumer>{(context) => <ParticipantTabLabelContainer context={context} />}</TaskContext.Consumer>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
