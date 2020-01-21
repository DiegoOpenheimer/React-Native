import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Hub, Auth, API, graphqlOperation} from 'aws-amplify';

import * as queries from '../graphql/queries';

const Home = props => {
  const [error, setError] = useState('Home');

  useEffect(() => {
    const listenAuth = ({payload}) => {
      console.log(payload);
      if (payload.event === 'signOut') {
        props.navigation.navigate('Login');
      }
    };
    Hub.listen('auth', listenAuth);
    loadData();
    return () => Hub.remove('auth', listenAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    const todos = await API.graphql(graphqlOperation(queries.listTodos)).catch(
      setError,
    );
    console.log(todos);
  }

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
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
