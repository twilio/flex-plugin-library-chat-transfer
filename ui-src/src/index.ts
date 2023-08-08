import * as Flex from '@twilio/flex-ui';
import * as FlexPlugin from '@twilio/flex-plugin';
import ConversationTransferPlugin from './ConversationTransferPlugin';
import { UIAttributes } from '../src/types/manager/ServiceConfiguration';
const { custom_data } = (Flex.Manager.getInstance().configuration as UIAttributes) || {};
const { enabled = false } = custom_data?.features?.chat_transfer || {};

export const isFeatureEnabled = () => {
  return enabled;
};

FlexPlugin.loadPlugin(ConversationTransferPlugin);
