import { render } from '@testing-library/react';

import BootsrappedDialog from './bootsrapped-dialog';

describe('BootsrappedDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BootsrappedDialog />);
    expect(baseElement).toBeTruthy();
  });
});
