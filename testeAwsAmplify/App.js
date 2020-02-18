import React from 'react';
import Navigator from './src/Navigation';
import awsConfiguration from './aws-exports';
import AWS from 'aws-amplify';
import {GoogleSignin} from '@react-native-community/google-signin';
import Reactotron from 'reactotron-react-native';

GoogleSignin.configure({
  webClientId:
    '98028159315-3a6ia77dthq8rki2u1ldr1c8nq25jpdh.apps.googleusercontent.com',
});

console.tron = console.log;
if (__DEV__) {
  console.tron = Reactotron.log;
  Reactotron.useReactNative().connect();
}

AWS.configure({
  ...awsConfiguration,
  oauth: {
    domain: 'auth-test-diego.auth.us-east-1.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'profile',
      'openid',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'myapp://',
    redirectSignOut: 'myapp://',
    responseType: 'code',
  },
});
// AWS.Logger.LOG_LEVEL = 'DEBUG';

const App = () => {
  return <Navigator />;
};

export default App;
