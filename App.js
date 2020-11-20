import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router/router';

export default function App() {
  useEffect(() => {
    RNBootSplash.show({});
  }, []);

  return (
    <NavigationContainer>
        <Router />
    </NavigationContainer>
  );
}
