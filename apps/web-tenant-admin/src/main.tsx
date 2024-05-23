import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root_tenant') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
