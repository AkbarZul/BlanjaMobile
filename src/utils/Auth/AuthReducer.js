import AsyncStorage from '@react-native-async-storage/async-storage';

async function setUser(data) {
  return await AsyncStorage.setItem('FARMER', JSON.stringify(data));
}

export default (state, action) => {
  switch (action.type) {
    case 'USER_REGISTER':
      setUser(action.payload);
      return {
        ...state,
        data: action.payload,
      };

    case 'USER_LOGIN':
      setUser(action.payload);
      return {
        ...state,
        data: action.payload,
      };

    case 'USER':
      // setUser(action.payload);
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
