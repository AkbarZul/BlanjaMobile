import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  cart: cartReducer,
  authReducer: authReducer,
});

export default reducers;
