import React, {Suspense} from 'react';
import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CodePushWrapper} from './app/constants/code-push-wrapper';
import {RootNavigation} from './app/navigation/root';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const MyApp = () => {
  // render
  return (
    <CodePushWrapper>
      <SafeAreaProvider>
        <Suspense fallback={null}>
          <GestureHandlerRootView style={styles.root}>
            <RootNavigation />
          </GestureHandlerRootView>
        </Suspense>
      </SafeAreaProvider>
    </CodePushWrapper>
  );
};
