import { render } from '@testing-library/react';

import { ThemeProvider } from './theme-provider';

describe('UiTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeProvider>hi</ThemeProvider>);
    expect(baseElement).toBeTruthy();
  });
});
