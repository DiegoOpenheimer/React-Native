import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Alert,
  Button,
} from 'react-native';
import {Auth} from 'aws-amplify';

export default function Account({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function createAccount() {
    Keyboard.dismiss();
    if (!email || !password) {
      Alert.alert('Attention', 'The fields cant to be empty');
      return;
    }
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          'custom:cpf': '42432402',
        },
      });
      Alert.alert('Attention', 'User signed with success');
      navigation.pop();
    } catch {
      Alert.alert('Attention', 'Fail to sign Up');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Text style={styles.title}>Create Account</Text>
        </View>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
        />
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        <Button title="save" onPress={createAccount} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 16,
  },
  title: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  input: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#cecece',
    padding: 16,
  },
});
