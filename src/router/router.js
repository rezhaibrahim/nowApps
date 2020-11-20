import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Splash, Login, Register,SplashLoading,Chats} from '../screens';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        options={{headerShown: false}}
        name="SplashLoading"
        component={SplashLoading}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Splash"
        component={Splash}
      />
       
     
      <Stack.Screen
        options={{title: 'Enter your phone number', headerShown: false}}
        name="Login"
        component={Login}
        
      />
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Register"
        component={Register}
      />
      <Stack.Screen 
      options={{title:'',headerShown:false}}
      name='Chats'
      component={Chats}/>
    </Stack.Navigator>
  );
};

class Router extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Auth"
          component={AuthStack}
        />
      </Stack.Navigator>
    );
  }
}

export default Router;
