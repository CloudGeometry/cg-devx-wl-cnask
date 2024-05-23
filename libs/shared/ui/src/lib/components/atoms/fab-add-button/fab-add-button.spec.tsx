import { render } from '@testing-library/react';

import FabAddButton from './fab-add-button';

describe('TodoAddButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FabAddButton onClick={() => undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
