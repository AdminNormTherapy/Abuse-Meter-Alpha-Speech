import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="dfb7de19-bfb5-4e41-9a58-2fa45fe4c23f">
      <App />
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
