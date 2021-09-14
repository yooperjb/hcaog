import React from 'react';
import ReactDOM from 'react-dom';

import '@fortawesome/fontawesome-svg-core/attribution';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faInfoCircle, faExternalLinkAlt, faChevronRight, faChevronLeft, faDollarSign, faBicycle, faWrench} from '@fortawesome/free-solid-svg-icons';

import App from './App';

import { GlobalProvider } from './contexts/GlobalContext';
import { LayerVisibilityContextProvider } from './contexts/LayerVisibilityContext';
import ViewPortProvider from './contexts/ViewPortContext';

import reportWebVitals from './reportWebVitals';

import './index.css';

library.add(
  faInfoCircle,
  faExternalLinkAlt,
  faChevronRight,
  faChevronLeft,
  faDollarSign,
  faBicycle,
  faWrench
);

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
