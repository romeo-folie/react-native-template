/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigators/app-navigator';
import AuthNavigator from './navigators/auth-navigator';
import AuthReducer from './context/Auth/AuthReducer';
import AuthContext from './context/Auth/AuthContext';
import LocaleState from './context/Locale/localeState';

const App = () => {
  const initialAuthState = {
    isLoading: true,
    user: null,
    userToken: null,
  };

  const [authState, dispatch] = React.useReducer(AuthReducer, initialAuthState);

  const authContext = React.useMemo(
    () => ({
      login: async (userdata) => {
        const {email, password} = userdata;

        return new Promise((resolve, reject) => {
          api
            .post('/login', {email, password})
            .then(async (res) => {
              if (res.data.error) {
                resolve(res);
              }

              if (res.data.user) {
                let token = res.data.access_token;
                let user = res.data.user.name;
                try {
                  await AsyncStorage.setItem('token', token);
                  await AsyncStorage.setItem('user', user);
                } catch (e) {
                  console.log('error setting token', e);
                }
                dispatch({type: 'LOGIN', user, token});
                resolve(res);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      logout: async () => {
        try {
          // remove token from storage
        } catch (e) {
          console.log('error removing token ', e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      let user = null;
      try {
        token = await AsyncStorage.getItem('token');
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        console.log('error retrieving token ', e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token, user});
    }, 1000);
  }, []);

  if (authState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <LocaleState>
      <AuthContext.Provider value={{...authContext, user: authState.user}}>
        <NavigationContainer>
          {authState.userToken == null ? <AuthNavigator /> : <AppNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </LocaleState>
  );
};

export default App;
