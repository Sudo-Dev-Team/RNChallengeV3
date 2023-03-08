import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {useSharedValue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';

import MaskedView from '@react-native-masked-view/masked-view';

import {AnimatedMask} from './components/animated-mask';
import {MaskView} from './components/mask-view';
import {OriginImage} from './components/origin-image';
import {OverlayMask} from './components/overlay-mask';
import {styles} from './styles';

export const TiktokRemix = () => {
  // state
  const progress = useSharedValue(0);
  const scaleMask = useSharedValue(1.2);
  const maskRef = useRef<AnimatedMask>(null);

  // render
  return (
    <View style={styles.root}>
      <Video
        onProgress={v => {
          if (v.currentTime === 0) {
            progress.value = 0;
            maskRef.current?.run();
          }
        }}
        repeat
        paused={false}
        playInBackground
        source={require('./files/tiktok.mp4')}
        style={[StyleSheet.absoluteFillObject, {opacity: 0}]}
      />
      <View style={styles.content}>
        <OverlayMask scaleMask={scaleMask} />
        <MaskedView
          style={styles.content}
          maskElement={
            <View style={styles.containerAnimated}>
              <AnimatedMask
                progress={progress}
                scaleMask={scaleMask}
                ref={maskRef}
              />
            </View>
          }>
          <MaskView />
        </MaskedView>
        <View style={styles.backdrop} />
        <OriginImage progress={progress} />
      </View>
    </View>
  );
};
