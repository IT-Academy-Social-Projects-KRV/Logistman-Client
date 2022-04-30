import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './configureStore'
import './assets/css/main.css'

const store = configureStore();

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
      <App />
  </Provider>,
  rootElement
);

export default store;
