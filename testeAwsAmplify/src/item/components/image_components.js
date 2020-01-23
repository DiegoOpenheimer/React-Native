import React, {useCallback} from 'react';
import {Image, StyleSheet, View, ActivityIndicator, Text, Animated} from 'react-native';

function ImageComponent(props) {
  const [imageLoaded, setImageLoaded] = React.useState();
  const [opacity] = React.useState(new Animated.Value(0));

  const handleLoad = useCallback(() => {
    if (imageLoaded) {
      return null;
    }
    if (imageLoaded === null) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <ActivityIndicator />
        </View>
      );
    }
    if (imageLoaded === false) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{textAlign: 'center'}}>Falha ao carregar imagem</Text>
        </View>
      );
    }
  }, [imageLoaded]);
  return (
    <View style={{flex: 1}}>
      <Animated.Image
        onError={() => setImageLoaded(false)}
        onLoadStart={() => setImageLoaded(null)}
        onLoadEnd={() => {
          if (imageLoaded !== false) {
            setImageLoaded(true);
            Animated.timing(opacity, {
              toValue: 1,
              duration: 1000,
            }).start();
          }
        }}
        style={[styles.content, {opacity}]}
        source={{uri: props.path}}
      />
      {handleLoad()}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default React.memo(ImageComponent);
