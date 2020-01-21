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
import {Auth, Hub} from 'aws-amplify';
import {useHeaderHeight} from 'react-navigation-stack';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import jwtDecode from 'jwt-decode'

const Login = props => {
  const [user, setUser] = useState({email: '', password: ''});
  useEffect(() => {
    const execute = () => {
      Auth.currentAuthenticatedUser()
        .then(() => {
          props.navigation.navigate('Home');
        })
        .catch(console.log);
    };
    execute();
    const listenAuth = ({payload}) => {
      if (payload.event === 'signIn') {
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
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokenDecoded = jwtDecode(userInfo.idToken)
      Auth.federatedSignIn(
        'accounts.google.com',
        {
          token: userInfo.idToken,
          expires_at: tokenDecoded.exp
        },
        {
          email: userInfo.user.email,
          name: userInfo.user.name,
          username: userInfo.user.id
        },
      )
        .catch(console.log);
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
          <Button
            title="create account"
            onPress={() => props.navigation.navigate('Account')}
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
