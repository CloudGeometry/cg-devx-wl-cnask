import { render } from '@testing-library/react';

import LocaleSelect, { LocaleSelectProps } from './locale-select';

describe('LocaleSelect', () => {
  const defaultProps: LocaleSelectProps = {
    onChange: vi.fn(),
    value: 'en-US',
    label: 'Language',
    options: [
      { code: 'en-US', name: 'English' },
      { code: 'es-ES', name: 'Español' }
    ]
  };

  it('should render successfully', () => {
    const { baseElement } = render(<LocaleSelect {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });
});
