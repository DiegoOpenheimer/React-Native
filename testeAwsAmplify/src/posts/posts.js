import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../graphql/queries';

function PostItemImpl({post}) {
  return <Text style={styles.posts}>{post.title}</Text>;
}

const PostItem = React.memo(PostItemImpl);

export default function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const result = await API.graphql(graphqlOperation(queries.listPosts));
      setPosts(result.data.listPosts.items);
    } catch (error) {
      console.log(error);
      Alert.alert('Fail to get posts');
    } finally {
      setLoading(false);
    }
  }

  const buildList = React.useCallback(() => {
    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <FlatList
        keyExtractor={item => item.id}
        data={posts}
        renderItem={({item}) => <PostItem post={item} />}
      />
    );
  }, [posts, loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List posts</Text>
      {buildList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  posts: {
    marginVertical: 16,
  },
});
