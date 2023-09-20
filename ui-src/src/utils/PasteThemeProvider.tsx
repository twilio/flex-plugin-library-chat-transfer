import * as Flex from '@twilio/flex-ui';
import { CustomizationProvider, PasteCustomCSS, CustomizationProviderProps } from '@twilio-paste/core/customization';
import React from 'react';

export default (flex: typeof Flex, manager: Flex.Manager) => {
  flex.setProviders({
    CustomProvider: (RootComponent) => (props) => {
      const pasteProviderProps: CustomizationProviderProps & { style: PasteCustomCSS } = {
        baseTheme: props.theme?.isLight ? 'default' : 'dark',
        theme: props.theme?.tokens,
        style: { minWidth: '100%', height: '100%' },
      };
      return (
        <CustomizationProvider {...pasteProviderProps}>
          <RootComponent {...props} />
        </CustomizationProvider>
      );
    },
  });
};
