import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  ProgressViewIOS,
  Text,
  Platform,
  ProgressBarAndroid,
} from 'react-native';
import {Hub, Auth, Storage} from 'aws-amplify';
import ImagePicker from 'react-native-image-picker';

const Home = props => {
  const [image, setImage] = useState();
  const [progress, setProgress] = useState({value: 0, success: undefined});

  useEffect(() => {
    const listenAuth = value => {
      console.log(value?.payload);
      if (value?.payload.event === 'signOut') {
        props.navigation.navigate('Login');
      }
    };
    Hub.listen('auth', listenAuth);
    return () => Hub.remove('auth', listenAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveStorage(key, content, config) {
    Storage.put(key, content, {
      ...config,
      level: 'public',
      progressCallback(progressFile) {
        setProgress({
          ...progress,
          value: progressFile.loaded / progressFile.total,
          success: undefined,
        });
      },
    })
      .then(() => setProgress({...progress, success: true, value: 0}))
      .catch(() => setProgress({...progress, success: false, value: 0}));
  }

  function choosePhoto() {
    const options = {
      title: 'Selecionar foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Câmera',
      chooseFromLibraryButtonTitle: 'Biblioteca de fotos',
      maxWidth: 1280,
      maxHeight: 720,
      quality: 0.7,
    };
    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('RESPONSE: ', response);
        const blob = await (await fetch(response.uri)).blob();
        console.log('blob: ', blob);
        setImage({uri: response.uri});
        saveStorage('photos/' + new Date().getTime() + blob.data.name, blob, {
          contentType: blob.data.type,
        });
      }
    });
  }

  const handlePhoto = useCallback(() => {
    if (image) {
      return (
        <View style={{width: '100%', padding: 16, alignItems: 'stretch'}}>
          <Image
            source={image}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              resizeMode: 'cover',
              alignSelf: 'center',
              marginBottom: 10,
            }}
          />
          {handleProgress(progress)}
        </View>
      );
    }
  }, [image, progress, handleProgress]);

  const handleProgress = useCallback(currentProgress => {
    if (currentProgress.success) {
      return (
        <Text style={{textAlign: 'center'}}>Image uploaded with success</Text>
      );
    }
    if (currentProgress.success === false) {
      return <Text style={{textAlign: 'center'}}>Fail to upload image</Text>;
    }
    if (Platform.OS === 'ios') {
      return <ProgressViewIOS progress={currentProgress.value} />;
    }
    return <ProgressBarAndroid progress={currentProgress.value} />;
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Save a file in storage" onPress={choosePhoto} />
      {handlePhoto()}
      <Button
        title="New Post"
        onPress={_ => props.navigation.navigate('Post')}
      />
      <Button title="Posts" onPress={_ => props.navigation.navigate('Posts')} />
    </View>
  );
};

Home.navigationOptions = ({navigation}) => ({
  headerRight: () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Button onPress={() => navigation.navigate('Item')} title="Photos" />
        <Button onPress={() => Auth.signOut()} title="logout" />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
