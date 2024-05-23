import { render } from '@testing-library/react';

import TableBodyContainer from './table-body-container';

describe('TableBodyContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableBodyContainer />);
    expect(baseElement).toBeTruthy();
  });
});
