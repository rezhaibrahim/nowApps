import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Router from './src/router/router';
import store from './src/redux/store';
export default function App() {
  useEffect(() => {
    RNBootSplash.show({});
  }, []);

  return (
    <Provider store={store().store}>
    <PersistGate loading={null} persistor={store().persistor}>
      <Router />
    </PersistGate>
  </Provider>
  );
}
