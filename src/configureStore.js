import { createStore } from 'redux'

import rootReducer from './rootReducer'

export default function configureStore(preloadedState) {

  const store = createStore(rootReducer, preloadedState)

  return store
}
