import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
  Button,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Auth} from 'aws-amplify';

function Account() {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [controlPassword, setControlPassword] = React.useState({
    text: 'show',
    value: true,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function createAccount() {
    console.log(name, email, password);
    if (!name || !email || !password) {
      Alert.alert('Attention', 'You have to fill every fields');
      return;
    }
    try {
      setLoading(true);
      const result = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          'custom:cpf': '497294798234',
        },
      });
      console.log(result);
    } catch (e) {
      console.log('Error:', e);
      Alert.alert('Attention', 'Fail to create account');
    } finally {
      setLoading(false);
    }
  }

  const handleContent = React.useCallback(() => {
    if (loading) {
      return <ActivityIndicator style={{alignSelf: 'center'}} />;
    }
    return (
      <React.Fragment>
        <Text style={styles.title}>Create Account</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Nome" />
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
        <View style={styles.contentInput}>
          <TextInput
            style={{flex: 1}}
            value={password}
            onChangeText={setPassword}
            placeholder="password"
            secureTextEntry={controlPassword.value}
          />
          <TouchableOpacity
            onPress={() => {
              setControlPassword(old => {
                const control = {...old};
                control.value = !old.value;
                control.text = control.value ? 'show' : 'hidden';
                return control;
              });
            }}>
            <Text>{controlPassword.text}</Text>
          </TouchableOpacity>
        </View>
        <Button title="Sign UP" onPress={createAccount} />
      </React.Fragment>
    );
  }, [loading, name, email, password, controlPassword, createAccount]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>{handleContent()}</View>
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
    fontSize: 30,
    textAlign: 'center',
  },
  contentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Account;
