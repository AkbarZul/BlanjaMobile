
//import liraries
import React, {useContext} from 'react';
import {MainNavigation} from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/utils/redux/store';

// Redux-persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistStore} from 'redux-persist';
const persistedStore = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
