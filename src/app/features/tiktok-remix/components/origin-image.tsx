import React from 'react';
import {StyleSheet, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import Animated, {
  Easing,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import {INPUT_OPACITY, OUTPUT_OPACITY, sharedTiming} from '../constant';
import {styles} from '../styles';
import {OriginImageProps} from '../type';

export const OriginImage = ({progress}: OriginImageProps) => {
  // state
  const progressBackdrop = useSharedValue(0);
  const opacity = useDerivedValue(() =>
    interpolate(progressBackdrop.value, INPUT_OPACITY, OUTPUT_OPACITY),
  );

  useAnimatedReaction(
    () => progress.value,
    (v, prev) => {
      if (v !== prev && v === 1) {
        progressBackdrop.value = sharedTiming(1, {
          duration: 5800,
          easing: Easing.linear,
        });
      }
    },
  );

  // restyle
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const topStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.3], [0, 1]),
    transform: [{translateX: interpolate(progress.value, [0, 1], [-600, 0])}],
  }));
  const bottomStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.3], [0, 1]),
    transform: [{translateX: interpolate(progress.value, [0, 1], [600, 0])}],
  }));

  // render
  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <View style={styles.halfImage}>
        <Animated.View style={[styles.containerImage, topStyle]}>
          <FastImage
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
            source={require('../files/image3.jpeg')}
          />
        </Animated.View>
      </View>
      <View style={styles.halfImage}>
        <Animated.View
          style={[styles.containerImage, styles.halfImageBottom, bottomStyle]}>
          <FastImage
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
            source={require('../files/image3.jpeg')}
          />
        </Animated.View>
      </View>
      <Animated.View style={[styles.backdropOrigin, backdropStyle]} />
    </View>
  );
};
