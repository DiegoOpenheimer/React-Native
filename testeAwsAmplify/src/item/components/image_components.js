import React, {useCallback} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Animated,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

function ImageComponent(props) {
  const [imageLoaded, setImageLoaded] = React.useState();
  const [opacity] = React.useState(new Animated.Value(0));

  const styles = React.useMemo(() => createStyle(props), [props]);

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
    <TouchableHighlight onLongPress={() => props.onLongPress(props.id)} >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
    </TouchableHighlight>
  );
}

const createStyle = props =>
  StyleSheet.create({
    content: {
      width: props.lastImage
        ? Dimensions.get('window').width
        : Dimensions.get('window').width / 2,
      height: Dimensions.get('window').width / 2,
      resizeMode: 'cover',
    },
  });

export default React.memo(ImageComponent);
