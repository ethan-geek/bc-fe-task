import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/antd.css';
import './index.css';
import App from './App.tsx';
import 'antd/dist/antd.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
