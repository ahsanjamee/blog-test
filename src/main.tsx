import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
