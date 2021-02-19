import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLogin: false,
  token: null,
  user_id: null,
  level: null,
  fullname: '',
  email: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        user_id: action.payload.user_id,
        level: action.payload.level,
        fullname: action.payload.fullname,
        email: action.payload.email,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        token: null,
        user_id: null,
        level: null,
      };
    case actionTypes.REGISTER:
      return {
        ...state,
        isLogin: false,
        username: action.payload.username,
        fullname: action.payload.fullname,
        email: action.payload.email,
        password: action.payload.password,
        level: action.payload.level,
      };
    default:
      return state;
  }
};

export default authReducer;
