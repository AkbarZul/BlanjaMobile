import {ActionType} from 'redux-promise-middleware';

export const ADD_TO_CART = 'ADD_TO_CART';

export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export const QUANTITY_INCREASED = 'increase_quantity';

export const QUANTITY_DECREASED = 'decrease_quantity';

export const ADD_TO_CHECKOUT = 'addToCheckout';

export const PICK_CART = 'PICK_CART';

export const CLEAR_CART = 'clear_cart';

export const CLEAR_CHECKOUT = 'clear_checkout';

//Auth
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_FULLFILLED = 'RESET_FULLFILLED';
export const CLEAR_STATE = 'CLEAR_STATE';

export const pending = `_${ActionType.Pending}`;
export const rejected = `_${ActionType.Rejected}`;
export const fulfilled = `_${ActionType.Fulfilled}`;
