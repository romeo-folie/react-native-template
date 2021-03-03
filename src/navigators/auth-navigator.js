import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/login';
import PasswordReset from '../screens/auth/password-reset';

const AuthStack = createStackNavigator();

const AuthNavigator = ({navigation}) => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="PasswordReset" component={PasswordReset} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
