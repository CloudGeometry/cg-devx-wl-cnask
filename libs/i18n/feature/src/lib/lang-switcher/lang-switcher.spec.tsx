import { render } from '@testing-library/react';

import LangSwitcher from './lang-switcher';

describe('LangSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LangSwitcher />);
    expect(baseElement).toBeTruthy();
  });
});
