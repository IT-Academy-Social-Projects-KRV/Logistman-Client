import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../rootReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const persistReducer_ = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistReducer_);
export const persistor = persistStore(store);
