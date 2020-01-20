import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Hub, Auth} from 'aws-amplify';

const Home = props => {
  useEffect(() => {
    const listenAuth = ({payload}) => {
      console.log(payload);
      if (payload.event === 'signOut') {
        props.navigation.navigate('Login');
      }
    };
    Hub.listen('auth', listenAuth);
    return () => Hub.remove('auth', listenAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

Home.navigationOptions = {
  headerRight: () => {
    return <Button onPress={() => Auth.signOut()} title="logout" />;
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
