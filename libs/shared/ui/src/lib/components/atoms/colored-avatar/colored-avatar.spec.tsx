import { render } from '@testing-library/react';

import ColoredAvatar from './colored-avatar';

describe('ColoredAvatar', () => {
  const defaultProps = { username: 'test' };
  it('should render successfully', () => {
    const { baseElement } = render(<ColoredAvatar {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });
});
