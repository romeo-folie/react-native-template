import React from 'react';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import api from '../utils/api';
import AsyncStorage from '@react-native-community/async-storage';

const AuthState = () => {
  const initialAuthState = {
    isLoading: true,
    user: null,
    userToken: null,
  };

  const [authState, dispatch] = React.useReducer(AuthReducer, initialAuthState);

  const authContext = React.useMemo(
    () => ({
      login: async (user) => {
        const {email, password} = user;
        api
          .post('/login', {email, password})
          .then(async (res) => {
            if (res.data.user) {
              let token = res.data.access_token;
              let user = res.data.user;
              // api.defaults.headers.common['Authorization'] = "Bearer " + token
              try {
                await AsyncStorage.setItem('token', token);
              } catch (e) {
                console.log('error setting token', e)
              }
              dispatch({ type: 'LOGIN', user, userToken: token });
            } else {
              // show an alert with an error
            }
          })
          .catch((err) => {
            // show an alert with error
          });
      },
      logout: async () => {
        try{
          await AsyncStorage.removeItem('token')
          // we will also drop all the tables here
        } catch(e) {
          console.log('error removing token ', e)
        }
        dispatch({ type: 'LOGOUT' })
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        ...authContext,
        isLoading: authState.isLoading,
        userToken: authState.userToken,
        dispatch
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
