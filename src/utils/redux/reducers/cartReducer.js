import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  cart: [],
  checkout: {
    transaction_code: '',
    id_address: '',
    item: [],
  },
};

const cartReducer = (state = INITIAL_STATE, action) => {
  let newCart = [...state.cart];
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // return {
      //   ...state,
      //   cart: [...state.cart, action.payload],
      // };
      console.log('ANJING', action.payload);
      const item = action.payload;
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false,
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? {...item, qty: item.qty + 1}
                : item,
            )
          : [...state.cart, {...item, qty: 1}],
      };
    case actionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.QUANTITY_INCREASED:
      const indexQtyInc = state.cart.findIndex((item) => {
        return action.payload.id === item.id;
      });
      newCart[indexQtyInc] = {
        ...newCart[indexQtyInc],
        qty: state.cart[indexQtyInc].qty + 1,
      };
      return {
        ...state,
        cart: newCart,
      };
    case actionTypes.QUANTITY_DECREASED:
      const indexQtyDec = state.cart.findIndex((item) => {
        return action.payload.id === item.id;
      });
      newCart[indexQtyDec] = {
        ...newCart[indexQtyDec],
        qty: state.cart[indexQtyDec].qty - 1,
      };
      if (newCart[indexQtyDec].qty === 0) {
        state.cart.splice(indexQtyDec, 1);
        return {
          ...state,
          cart: state.cart,
        };
      } else {
        return {
          ...state,
          cart: newCart,
        };
      }
    case actionTypes.ADD_TO_CHECKOUT:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          transaction_code: action.payload.transaction_code,
          id_address: action.payload.id_address,
          item: action.payload.item,
        },
      };
    case actionTypes.PICK_CART:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? {...item, pick: !item.pick} : item,
        ),
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          item.pick === true;
        }),
      };
    case actionTypes.CLEAR_CHECKOUT:
      return {
        ...state,
        checkout: {
          transaction_code: '',
          item: [],
        },
      };
    default:
      return state;
  }
};

export default cartReducer;
