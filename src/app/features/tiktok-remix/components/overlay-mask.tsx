import React from 'react';
import { StyleSheet } from 'react-native';

import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { OverlayMaskProps } from '../type';

export const OverlayMask = ({ scaleMask }: OverlayMaskProps) => {
  // restyle
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scaleMask.value }],
  }));
  // render
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, style]}>
      <FastImage
        style={StyleSheet.absoluteFillObject}
        source={require('../files/image2.jpeg')}
      />
    </Animated.View>
  );
};
