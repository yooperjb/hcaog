import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faInfoCircle, faExternalLinkAlt, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import App from './App';
import { GlobalProvider } from './contexts/GlobalContext';
import { LayerVisibilityContextProvider } from './contexts/LayerVisibilityContext';
import reportWebVitals from './reportWebVitals';
import './index.css';
import ViewPortProvider from './contexts/ViewPortContext';

library.add(faInfoCircle, faExternalLinkAlt, faChevronRight, faChevronLeft);

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <ViewPortProvider>
        <LayerVisibilityContextProvider>
          <App />
        </LayerVisibilityContextProvider>
      </ViewPortProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
