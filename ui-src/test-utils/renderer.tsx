import React, { FC, ReactElement } from 'react';
import { render as testRender, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeOptions, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider, Theme } from '@emotion/react';
import { CustomizationProvider } from '@twilio-paste/core/customization';


interface CustomRenderOptions extends RenderOptions {
  route?: string;
}

const testTheme = {
  colors: {
    base1: '',
    base2: '',
    base3: '',
    base4: '',
    base5: '',
    base6: '',
    base7: '',
    base8: '',
    base9: '',
    base10: '',
    base11: '',
  },
  tokens: {
    backgroundColors: {},
    borderColors: {},
    radii: {},
    borderWidths: {},
    flexColors: {},
    fontSizes: {},
    fontWeights: {},
    lineHeights: {},
    spacings: {},
    textColors: {},
    sizings: {},
  },
  name: 'GreyLight',
  calculated: {
    lightTheme: '',
  },
  isLight: true,
};

const customRender = (
  ui: ReactElement,
  { route = '/', ...options }: Omit<CustomRenderOptions, 'wrapper'> = {},
): RenderResult => {
  const TestProviders: FC = ({ children }): JSX.Element => {
    return (
      <CustomizationProvider theme={testTheme.tokens}>
        <ThemeProvider theme={testTheme as unknown as Theme}>
          <MuiThemeProvider theme={createTheme(testTheme as ThemeOptions)}>{children}</MuiThemeProvider>
        </ThemeProvider>
      </CustomizationProvider>
    );
  };
  TestProviders.displayName = 'TestProviders';

  return testRender(ui, { wrapper: TestProviders, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
