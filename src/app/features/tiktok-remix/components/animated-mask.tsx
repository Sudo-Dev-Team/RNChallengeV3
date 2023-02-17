import React, {forwardRef, useCallback, useImperativeHandle} from 'react';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
} from 'react-native-reanimated';

import {
  ORIGIN_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sharedTiming,
} from '../constant';
import {TiktokRemixProps} from '../type';

export const AnimatedMask = forwardRef(
  ({scaleMask, progress}: TiktokRemixProps, ref) => {
    // state
    const width = useSharedValue(SCREEN_WIDTH);
    const height = useSharedValue(SCREEN_HEIGHT);
    const rotate = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // func
    const run = useCallback(() => {
      width.value = SCREEN_WIDTH;
      height.value = SCREEN_HEIGHT;
      rotate.value = 0;
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = withDelay(100, sharedTiming(-90, {duration: 1500}));
      width.value = withDelay(
        100,
        sharedTiming(ORIGIN_HEIGHT, {duration: 700}, f => {
          'worklet';
          if (f) {
            scaleMask.value = withSequence(
              sharedTiming(1.25, {duration: 600}),
              sharedTiming(1.1, {duration: 1200}),
              sharedTiming(1.25, {duration: 400}),
              sharedTiming(1.2, {duration: 800}),
              withDelay(500, sharedTiming(1.15, {duration: 600})),
              sharedTiming(1.15, {duration: 600}),
              withDelay(300, sharedTiming(1.2, {duration: 800})),
              sharedTiming(1.15, {duration: 400}),
              withDelay(100, sharedTiming(1.2, {duration: 600})),
              sharedTiming(1.3, {duration: 600}),
              sharedTiming(1.05, {duration: 500}),
              sharedTiming(1.1, {duration: 200}),
              sharedTiming(1.3, {duration: 500}),
            );
            translateX.value = withSequence(
              sharedTiming(250, {duration: 600}),
              sharedTiming(0, {duration: 1200}),
              sharedTiming(-250, {duration: 400}),
              sharedTiming(0, {duration: 800}, f1 => {
                'worklet';
                if (f1) {
                  rotate.value = withDelay(
                    400,
                    sharedTiming(0, {duration: 800}),
                  );
                  width.value = withDelay(
                    600,
                    withSequence(
                      sharedTiming(
                        SCREEN_WIDTH - 20,
                        {
                          duration: 150,
                        },
                        f3 => {
                          'worklet';
                          if (f3) {
                            rotate.value = sharedTiming(
                              90,
                              {
                                duration: 1300,
                                easing: Easing.bezier(0.33, 1, 0.68, 1),
                              },
                              f4 => {
                                'worklet';
                                if (f4) {
                                  width.value = sharedTiming(
                                    ORIGIN_HEIGHT,
                                    {
                                      duration: 250,
                                    },
                                    f5 => {
                                      if (f5) {
                                        translateX.value = sharedTiming(
                                          250,
                                          {duration: 1200},
                                          f6 => {
                                            'worklet';
                                            if (f6) {
                                              translateX.value = withSequence(
                                                sharedTiming(0, {
                                                  duration: 300,
                                                }),
                                                sharedTiming(-100, {
                                                  duration: 300,
                                                }),
                                                sharedTiming(
                                                  -0,
                                                  {
                                                    duration: 250,
                                                  },
                                                  f7 => {
                                                    'worklet';
                                                    if (f7) {
                                                      width.value =
                                                        sharedTiming(0, {
                                                          duration: 200,
                                                        });
                                                      progress.value =
                                                        withDelay(
                                                          100,
                                                          sharedTiming(1, {
                                                            duration: 100,
                                                          }),
                                                        );
                                                    }
                                                  },
                                                ),
                                              );
                                            }
                                          },
                                        );
                                      }
                                    },
                                  );
                                }
                              },
                            );
                          }
                        },
                      ),
                    ),
                  );
                }
              }),
            );
          }
        }),
      );
    }, []);

    // restyle
    const style = useAnimatedStyle(() => ({
      width: width.value,
      height: height.value,
      transform: [
        {rotate: `${rotate.value}deg`},
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
      backgroundColor: '#000',
    }));

    // effect
    useImperativeHandle(ref, () => ({run}), [run]);

    // render
    return <Animated.View style={style} />;
  },
);

export type AnimatedMask = {
  run: () => void;
};
