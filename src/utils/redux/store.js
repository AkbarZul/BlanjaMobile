// import {createStore} from 'redux';
// import reducers from './reducers';

// const store = createStore(reducers);

// export default store;

import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import PromiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
};

const logger = createLogger();
const enchancer = applyMiddleware(logger, PromiseMiddleware);

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, enchancer);

export default store;
