import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, View, ViewProps} from 'react-native';

import Splash from 'react-native-bootsplash';
import CodePush, {DownloadProgress} from 'react-native-code-push';

import {useDisableBackHandler} from '../';

import {WIDTH_PROGRESS} from './constant';
import {styles} from './styles';

export const CodePushWrapper = ({children}: ViewProps) => {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const progress = useRef(new Animated.Value(0)).current;
  // func
  const handleDownloadProgress = ({
    receivedBytes,
    totalBytes,
  }: DownloadProgress) => {
    progress.setValue(Math.round((receivedBytes / totalBytes) * 100));
  };

  const checkUpdateCodePush = async () => {
    if (__DEV__) {
      return;
    }
    try {
      await CodePush.notifyAppReady();
      const remotePackage = await CodePush.checkForUpdate();
      if (remotePackage) {
        Splash.hide();
        setLoading(true);
        progress.setValue(0);
        const localPackage = await remotePackage.download(
          handleDownloadProgress,
        );
        await localPackage.install(CodePush.InstallMode.IMMEDIATE);
      }
    } catch {
      console.log('Something wrong when use code push');
    }

    setTimeout(() => {
      checkUpdateCodePush();
    }, 5000);
  };

  // effect
  useDisableBackHandler(loading);
  useEffect(() => {
    checkUpdateCodePush();
  }, []);

  // render
  return (
    <>
      <View
        pointerEvents={loading ? 'none' : 'auto'}
        style={[styles.root, {opacity: loading ? 0 : 1}]}>
        {children}
      </View>
      {loading ? (
        <View style={styles.rootCodePush}>
          <View style={styles.containerLoading}>
            <View style={styles.track}>
              <Animated.View
                style={[
                  styles.thumb,
                  {
                    transform: [
                      {
                        translateX: progress.interpolate({
                          inputRange: [0, 100],
                          outputRange: [-WIDTH_PROGRESS, 0],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            <Text style={styles.textUpload}>Updating ... </Text>
          </View>
        </View>
      ) : null}
    </>
  );
};
