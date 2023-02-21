import {SharedValue} from 'react-native-reanimated';

export type ItemGridProps = {
  width: number;
  height: number;
  uri: string;
};

export type GridContextType = {
  rotate: SharedValue<number>;
};
