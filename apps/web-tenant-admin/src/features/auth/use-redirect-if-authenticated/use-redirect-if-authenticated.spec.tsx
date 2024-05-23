import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useRedirectIfAuthenticated from './use-redirect-if-authenticated';

describe('useRedirectIfAuthenticated', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useRedirectIfAuthenticated());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
