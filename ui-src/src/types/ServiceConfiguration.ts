import * as Flex from '@twilio/flex-ui';
export default interface ChatTransferConfiguration {
  enabled: boolean;
}

type FlexUIAttributes = Flex.ServiceConfiguration['ui_attributes'];

export interface UIAttributes extends FlexUIAttributes {
  custom_data: {
    // serverless_functions_domain: string;
  };
}
