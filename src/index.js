import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalProvider } from './contexts/GlobalContext';
import { LayerVisibilityContextProvider } from './contexts/LayerVisibilityContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <LayerVisibilityContextProvider>
        <App />
      </LayerVisibilityContextProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();