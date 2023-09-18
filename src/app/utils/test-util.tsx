import * as React from 'react';
import {
  render as rtlRender,
  renderHook as rhRender,
} from '@testing-library/react';

function render(ui: React.ReactElement) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  );
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react';
// override React Testing Library's render with our own
export { render };
