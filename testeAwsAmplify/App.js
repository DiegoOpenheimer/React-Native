import React from 'react';
import Navigator from './src/Navigation';
import awsConfiguration from './aws-exports';
import AWS from 'aws-amplify';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '98028159315-3a6ia77dthq8rki2u1ldr1c8nq25jpdh.apps.googleusercontent.com',
});

AWS.configure(awsConfiguration);

const App = () => {
  return <Navigator />;
};

export default App;
