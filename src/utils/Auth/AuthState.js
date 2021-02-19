import React, {createContext, useReducer, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthReducer} from './AuthReducer';
// import SplashScreen from './../screens/SplashScreen';

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('token');
    return user ? JSON.parse(user) : {};
  } catch (e) {
    console.log('Failed to fetch the data from Storage');
  }
};

export const AuthContext = createContext();

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, {data: {}});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      dispatch({type: 'USER', payload: user});
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  function userRegister(user) {
    dispatch({
      type: 'USER_REGISTER',
      payload: user,
    });
  }

  function userLogin(user) {
    dispatch({
      type: 'USER_LOGIN',
      payload: user,
    });
  }

  //   if (isLoading) {
  //     return <SplashScreen />;
  //   }

  return (
    <AuthContext.Provider
      value={{
        user: state,
        userRegister,
        userLogin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
