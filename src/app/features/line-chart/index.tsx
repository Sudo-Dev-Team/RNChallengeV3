import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import {
  Canvas,
  Group,
  interpolateColors,
  interpolatePaths,
  Path,
  runTiming,
  Skia,
  SkPath,
  useComputedValue,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';

import { GRAPH_HEIGHT, GRAPH_WIDTH, randomDataChart } from './mock';
import { DataPath } from './type';

import { sharedClamp } from '../../constants';

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
  const translateXSkia = useValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const translateX = useSharedValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const leftBound = useSharedValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const reset = useSharedValue(false);
  const progressPath = useValue(0);
  const progressColor = useValue(0);
  const currentPath = useValue(dayPathSk);
  const nextPath = useValue(dayPathSk);
  const currentColor = useValue(dataExample.dayData.color);
  const nextColor = useValue(dataExample.dayData.color);

  const path = useComputedValue(() => {
    return interpolatePaths(
      progressPath.current,
      [0, 1],
      [currentPath.current, nextPath.current],
    );
  }, [progressPath, currentPath, nextPath]);

  const color = useComputedValue(() => {
    return interpolateColors(
      progressColor.current,
      [0, 1],
      [currentColor.current, nextColor.current],
    );
  }, [progressColor, currentColor, nextColor]);

  const transform = useComputedValue(
    () => [{ translateX: translateXSkia.current }],
    [translateXSkia],
  );

  useSharedValueEffect(() => {
    translateXSkia.current = translateX.value;
  }, translateX);

  // func
  const handleChangePath = (nextNextPath: SkPath, data: DataPath) => {
    return () => {
      // color
      currentColor.current = nextColor.current;
      nextColor.current = data.color;
      progressColor.current = 0;

      // path
      currentPath.current = nextPath.current;
      nextPath.current = nextNextPath;
      progressPath.current = 0;

      // translateX
      leftBound.value = -data.width + GRAPH_WIDTH;
      reset.value = true;
      // translateX.value = -data.width + GRAPH_WIDTH;
      runTiming(translateXSkia, -data.width + GRAPH_WIDTH, { duration: 300 });
      // translateXSkia.current = -data.width + GRAPH_WIDTH;
      // run
      runTiming(progressPath, 1, { duration: 300 });
      runTiming(progressColor, 1, { duration: 300 });
    };
  };
  // runTiming(translateX, 100);
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      console.log(translateXSkia.current);
      if (reset.value) {
        translateX.value = leftBound.value;
        reset.value = false;
      }
      // translateX.value = leftBound.value;
    })
    .onChange(({ changeX }) => {
      translateX.value = sharedClamp(
        translateX.value + changeX,
        leftBound.value,
        0,
      );
    });

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
