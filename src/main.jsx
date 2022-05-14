import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import NetworkTables from './networktables/networktables';
import '@frc-web-components/frc-web-components/build/frc-web-components';

NetworkTables.connectToWs('localhost:8888');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
