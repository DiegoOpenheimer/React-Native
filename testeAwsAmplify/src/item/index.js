import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Storage} from 'aws-amplify';
import {FlatList} from 'react-native-gesture-handler';
import ImageComponent from './components/image_components';

const S3 =
  'https://amplifyteste41154c1604ac413989a097887f699ef9104442-test.s3.amazonaws.com/public/';

export default function Item() {
  const [photos, setPhotos] = React.useState([]);

  React.useEffect(() => {
    Storage.list('photos/')
      .then(setPhotos)
      .catch(console.tron);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista S3</Text>
      <FlatList
        numColumns={2}
        data={photos}
        renderItem={({item}) => <ImageComponent path={`${S3}${item.key}`} />}
        keyExtractor={item => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
