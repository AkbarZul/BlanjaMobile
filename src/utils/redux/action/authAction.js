import * as actionTypes from '../actionTypes';

export const login = (token, user_id, level, fullname, email) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      token: token,
      user_id: user_id,
      level: level,
      fullname: fullname,
      email: email,
    },
  };
};

export const register = (username, fullname, email, password, level) => {
  return {
    type: actionTypes.REGISTER,
    payload: {
      username: username,
      fullname: fullname,
      email: email,
      password: password,
      level: level,
    },
  };
};

export const logout = (token, user_id, level) => {
  return {
    type: actionTypes.LOGOUT,
    payload: {
      token: token,
      user_id: user_id,
      level: level,
    },
  };
};
