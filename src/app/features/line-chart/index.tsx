import React, {useMemo} from 'react';
import {Button, StyleSheet, View} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  Canvas,
  Group,
  Path,
  runTiming,
  Skia,
  SkPath,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import {GRAPH_HEIGHT, GRAPH_WIDTH, randomDataChart} from './mock';
import {DataPath} from './type';

import {sharedClamp} from '../../constants';

const dataExample = randomDataChart();
const dayPathSk = Skia.Path.MakeFromSVGString(
  dataExample.dayData.path,
) as SkPath;
const weekPathSk = Skia.Path.MakeFromSVGString(
  dataExample.weekData.path,
) as SkPath;
const monthPathSk = Skia.Path.MakeFromSVGString(
  dataExample.monthData.path,
) as SkPath;
const yearPathSk = Skia.Path.MakeFromSVGString(
  dataExample.yearData.path,
) as SkPath;

export const LineChart = () => {
  // state
  const translateX = useSharedValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const translateXSkia = useValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const leftBound = useSharedValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const reset = useSharedValue(false);
  const progressPath = useValue(0);
  const progressColor = useSharedValue(0);
  const paths = useValue<{from: SkPath; to: SkPath}>({
    from: dayPathSk,
    to: dayPathSk,
  });
  const currentColor = useSharedValue(dataExample.dayData.color);
  const nextColor = useSharedValue(dataExample.dayData.color);

  const path = useComputedValue(() => {
    const {from, to} = paths.current;
    if (!from || !to) return Skia.Path.Make();
    return to.interpolate(from, progressPath.current)!;
  }, [progressPath]);

  const color = useDerivedValue(() => {
    return interpolateColor(
      progressColor.value,
      [0, 1],
      [currentColor.value, nextColor.value],
    );
  }, [progressColor, currentColor, nextColor]);

  // un comment to see bug update translateX with 1 skia value and 1 reanimated value
  // const transform = useDerivedValue(
  //   () => [{translateX: translateX.value}],
  //   [translateX],
  // );

  const transform = useComputedValue(
    () => [{translateX: translateXSkia.current}],
    [translateXSkia],
  );

  // func
  const handleChangePath = (nextNextPath: SkPath, data: DataPath) => {
    return () => {
      // color
      currentColor.value = nextColor.value;
      nextColor.value = data.color;
      progressColor.value = 0;

      // path
      paths.current = {
        from: paths.current.to,
        to: nextNextPath,
      };
      progressPath.current = 0;
      leftBound.value = -data.width + GRAPH_WIDTH;
      reset.value = true;

      // with 1 skia value, path not update on the same time with translateX
      // runTiming(progressPath, 1, {
      //   duration: 3000,
      //   easing: Easing.linear,
      // });

      // translateX.value = withTiming(-data.width + GRAPH_WIDTH, {
      //   duration: 3000,
      // });

      // with 2 skia value, path update on the same time with translateX
      runTiming(progressPath, 1, {
        duration: 1000,
        easing: Easing.linear,
      });
      runTiming(translateXSkia, -data.width + GRAPH_WIDTH, {duration: 1000});

      progressColor.value = withTiming(-data.width + GRAPH_WIDTH, {
        duration: 1000,
        easing: Easing.linear,
      });
    };
  };

  const updateSkia = (value: number) => {
    translateXSkia.current = value;
  };

  const panGesture = useMemo(() => {
    // dot not update skia on the main thread. this will crash app
    return Gesture.Pan()
      .onBegin(() => {
        if (reset.value) {
          translateX.value = leftBound.value;
          reset.value = false;
        }
      })
      .onChange(({changeX}) => {
        translateX.value = sharedClamp(
          translateX.value + changeX,
          leftBound.value,
          0,
        );
      });
  }, []);

  useAnimatedReaction(
    () => translateX.value,
    (v, prev) => {
      if (prev === v) return;
      runOnJS(updateSkia)(v);
    },
  );

  // render
  return (
    <View style={[styles.container]}>
      <Button
        title="Day"
        onPress={handleChangePath(dayPathSk, dataExample.dayData)}
      />
      <Button
        title="Week"
        onPress={handleChangePath(weekPathSk, dataExample.weekData)}
      />
      <Button
        title="Month"
        onPress={handleChangePath(monthPathSk, dataExample.monthData)}
      />
      <Button
        title="Year"
        onPress={handleChangePath(yearPathSk, dataExample.yearData)}
      />
      <GestureDetector gesture={panGesture}>
        <Canvas style={styles.svg}>
          <Group transform={transform}>
            <Path path={path} style={'stroke'} color={color} />
          </Group>
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  svg: {
    width: GRAPH_WIDTH,
    height: GRAPH_HEIGHT,
    alignSelf: 'center',
  },
});
