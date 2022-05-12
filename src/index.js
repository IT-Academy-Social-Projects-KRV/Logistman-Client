import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import './assets/css/main.css'
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  rootElement
);

export default store;
