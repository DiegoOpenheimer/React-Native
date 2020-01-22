import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Auth, Hub, API} from 'aws-amplify';
import {useHeaderHeight} from 'react-navigation-stack';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import jwtDecode from 'jwt-decode';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const Login = props => {
  const [user, setUser] = useState({email: '', password: ''});
  useEffect(() => {
    const execute = () => {
      Auth.currentAuthenticatedUser()
        .then(currentUser => {
          console.log('USER: ', currentUser);
          props.navigation.navigate('Home');
        })
        .catch(console.log);
    };
    execute();
    const listenAuth = value => {
      console.log('PAYLOAD: ', value?.payload);
      if (value?.payload?.event === 'signIn') {
        setUser({email: '', password: ''});
        props.navigation.navigate('Home');
      }
    };
    Hub.listen('auth', listenAuth);
    return () => Hub.remove('auth', listenAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heightHeader = useHeaderHeight();

  const signIn = () => {
    Keyboard.dismiss();
    const callbackError = e => {
      Alert.alert(e.message);
    };
    Auth.signIn(user.email, user.password).catch(callbackError);
  };

  const signInGoogle = async () => {
    const provider = 'google';
    console.log(provider);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokenDecoded = jwtDecode(userInfo.idToken);
      Auth.federatedSignIn(
        provider,
        {
          token: userInfo.idToken,
          expires_at: tokenDecoded.exp,
        },
        {
          email: userInfo.user.email,
          name: userInfo.user.name,
          username: userInfo.user.id,
        },
      ).catch(console.log);
    } catch (error) {
      console.log('Error: ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Usuário cancelou');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Está em progresso');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play service não está disponível');
      } else {
        Alert.alert('Erro desconhecido');
      }
    }
  };

  const signInWithFedered = federed => {
    Auth.federatedSignIn({provider: federed})
      .then(config => console.log('FEDERED', config))
      .catch(console.log);
  };

  const signWithFacebook = (error, result) => {
    console.log('callback...');
    if (error) {
      console.log('login has error: ' + result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      console.log(result);
      AccessToken.getCurrentAccessToken()
        .then(data => {
          const infoRequest = new GraphRequest(
            '/me?fields=name,email,picture',
            null,
            (e, response) => {
              if (e) {
                console.log('ERROR: ', e);
                return;
              }
              Auth.federatedSignIn(
                'facebook',
                {
                  token: data.accessToken,
                  expires_at: data.expirationTime,
                },
                {
                  email: response.email,
                  name: response.name,
                  username: response.id,
                },
              ).catch(console.log);
              console.log('RESPONSE', response);
              console.log('DATA ACCESS TOKEN: ', data);
            },
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        })
        .catch(console.log);
    }
  };

  const styles = useMemo(() => createStyle({heightHeader}), [heightHeader]);

  return (
    <ScrollView bounces={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'android' ? -85 : 0}>
          <View>
            <Text style={styles.alignText}>Login</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={email => setUser({...user, email})}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={password => setUser({...user, password})}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity
            disabled={!user.email || !user.password}
            onPress={() => signIn()}
            style={styles.buttonSignIn}>
            <Text style={[styles.alignText, styles.textBtnColor]}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signInGoogle()}
            style={[styles.buttonSignIn, styles.btnGoogle]}>
            <Text style={[styles.alignText, styles.textBtnColor]}>
              Google SDK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signInWithFedered('Google')}
            style={[styles.buttonSignIn, styles.btnGoogle]}>
            <Text style={[styles.alignText, styles.textBtnColor]}>
              Google HOST UI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signInWithFedered('Facebook')}
            style={styles.buttonSignIn}>
            <Text style={[styles.alignText, styles.textBtnColor]}>
              Facebook HOST UI
            </Text>
          </TouchableOpacity>
          <LoginButton
            style={{width: '100%', padding: 16}}
            onLoginFinished={signWithFacebook}
            onLogoutFinished={() => console.log('logout.')}
          />

          <Button
            title="create account"
            onPress={() => props.navigation.navigate('Account')}
          />
          <Button
            title="31231231"
            onPress={async () => {
              const todos = await API.get('firstRestApi', '/items').catch(
                console.log,
              );
              console.log(todos);
            }}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const createStyle = props =>
  StyleSheet.create({
    container: {
      height:
        Dimensions.get('screen').height -
        props.heightHeader -
        (StatusBar.currentHeight ?? 24),
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: 16,
    },
    input: {
      borderColor: '#cecece',
      borderWidth: 1,
      padding: 16,
      marginVertical: 16,
    },
    alignText: {
      textAlign: 'center',
    },
    textBtnColor: {
      color: 'white',
    },
    buttonSignIn: {
      borderRadius: 10,
      padding: 8,
      backgroundColor: 'blue',
      margin: 5,
    },
    btnGoogle: {
      backgroundColor: 'red',
    },
  });

export default Login;
