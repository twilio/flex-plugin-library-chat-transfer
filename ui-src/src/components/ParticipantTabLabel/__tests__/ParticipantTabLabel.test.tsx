import React from 'react';
import { render } from '@testing-library/react';
import { TaskContext, Template } from '@twilio/flex-ui';
import { ParticipantTabLabelContainer } from '../ParticipantTabLabel';

describe('ParticipantTabLabelContainer', () => {
  it('should render correct snapshot', () => {
    const wrapper = render(
      <TaskContext.Consumer>{(context) => <ParticipantTabLabelContainer context={context} />}</TaskContext.Consumer>,
    );
    // expect(wrapper).toMatchSnapshot();
  });
});
