import React, { useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native';
import Color from '../Color';

interface IDivider {
    style: StyleProp<ViewStyle>,
}

const Divider = (props: IDivider) => {
    return (
        <View style={[styles.divider, props.style]}></View>
    );
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: Dimensions.get('window').width,
        backgroundColor: Color.gray
    },
});

export default React.memo(Divider);
