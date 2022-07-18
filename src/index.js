import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import './assets/css/main.css'
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

const container  = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default store;
