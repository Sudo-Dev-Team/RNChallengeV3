import {StyleSheet} from 'react-native';

import {HEIGHT_PROGRESS, WIDTH_PROGRESS} from './constant';
export const styles = StyleSheet.create({
  rootCodePush: {
    ...StyleSheet.absoluteFillObject,
  },
  root: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1019',
  },
  track: {
    width: WIDTH_PROGRESS,
    height: HEIGHT_PROGRESS,
    borderRadius: 10,
    backgroundColor: '#282C31',
    overflow: 'hidden',
  },
  thumb: {
    width: WIDTH_PROGRESS,
    height: HEIGHT_PROGRESS,
    borderRadius: 10,
    backgroundColor: '#21F5A8',
  },
  textUpload: {
    color: '#fff',
    marginTop: 10,
  },
});
