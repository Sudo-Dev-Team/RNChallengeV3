import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constant';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    overflow: 'hidden',
    flex: 1,
    zIndex: 1,
  },
  containerAnimated: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  halfImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
    overflow: 'hidden',
  },
  halfImageBottom: {
    bottom: 0,
    position: 'absolute',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  backdropOrigin: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.2)',
  },
});
