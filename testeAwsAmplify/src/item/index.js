import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Storage} from 'aws-amplify';
import {FlatList} from 'react-native-gesture-handler';
import ImageComponent from './components/image_components';
import ImageViewer from 'react-native-image-zoom-viewer';

const S3 =
  'https://amplifyteste41154c1604ac413989a097887f699ef9104442-test.s3.amazonaws.com/public/';

export default function Item() {
  const [photos, setPhotos] = React.useState([]);
  const [visibleModal, setVisibleModal] = React.useState({
    visible: false,
    image: null,
  });

  React.useEffect(() => {
    Storage.list('photos/')
      .then(setPhotos)
      .catch(console.tron);
  }, []);

  function removeImage(key) {
    Storage.remove(key)
      .then(() => setPhotos([...photos.filter(photo => photo.key !== key)]))
      .catch(() => Alert.alert('Attention', ':-( Fail to remove the photo'));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista S3</Text>
      <FlatList
        numColumns={2}
        data={photos}
        renderItem={({item, index}) => (
          <ImageComponent
            path={`${S3}${item.key}`}
            id={item.key}
            lastImage={index === photos.length - 1 && photos.length % 2 !== 0}
            onPress={path =>
              setVisibleModal({
                ...visibleModal,
                visible: true,
                image: {url: path},
              })
            }
            onLongPress={key => {
              Alert.alert(
                'Attention',
                'Do you really want to remove the image?',
                [
                  {text: 'Cancelar', style: 'cancel'},
                  {text: 'Ok', onPress: () => removeImage(key)},
                ],
              );
            }}
          />
        )}
        keyExtractor={item => item.key}
      />
      <Modal visible={visibleModal.visible}>
        <ImageViewer
          loadingRender={() => <ActivityIndicator />}
          imageUrls={[visibleModal.image]}
          onClick={() =>
            setVisibleModal({...visibleModal, visible: false, image: null})
          }
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 16,
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
