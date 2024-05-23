import { render } from '@testing-library/react';

import ItemActionButton from './item-action-button';

describe('ItemActionButtons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ItemActionButton />);
    expect(baseElement).toBeTruthy();
  });
});
