import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';

let root = createRoot(document.body)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
