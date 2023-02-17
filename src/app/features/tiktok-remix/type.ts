import { SharedValue } from 'react-native-reanimated';

export type TiktokRemixProps = {
  scaleMask: SharedValue<number>;
  progress: SharedValue<number>;
};
export type OverlayMaskProps = {
  scaleMask: SharedValue<number>;
};

export type OriginImageProps = {
  progress: SharedValue<number>;
};
