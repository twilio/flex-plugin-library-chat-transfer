import FlexTelemetry from '@twilio/flex-ui-telemetry';
import packageJSON from '../../package.json';

const flexManager = window?.Twilio?.Flex?.Manager?.getInstance();

export enum Event {
  CHAT_TRANSFERRED_WARM = 'Warm Chat Transferred',
  CHAT_TRANSFERRED_COLD = 'Cold Chat Transferred',
}

export const Analytics = new FlexTelemetry({
  source: 'flexui',
  role: packageJSON.name,
  plugin: packageJSON.name,
  pluginVersion: packageJSON.version,
  originalPluginName: packageJSON.id,
});
