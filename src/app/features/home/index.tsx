import React from 'react';
import { ScrollView, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ItemFunction } from './components/item-function';

import { navigate } from '../../navigation/navigation-service';
import { APP_SCREEN, RootStackParamList } from '../../navigation/screen-type';

export const Home = () => {
  // state
  const { bottom } = useSafeAreaInsets();
  // func
  const handleNavigate = (screen: keyof RootStackParamList) => {
    return () => {
      navigate(screen);
    };
  };

  // render
  return (
    <ScrollView>
      <ItemFunction
        text="Card Rotate"
        onPress={handleNavigate(APP_SCREEN.CARD_ROTATE)}
      />
      <ItemFunction
        text="Space Button"
        onPress={handleNavigate(APP_SCREEN.SPACE_BUTTON)}
      />
      <ItemFunction
        text="Card Gradient"
        onPress={handleNavigate(APP_SCREEN.CARD_GRADIENT)}
      />
      <ItemFunction
        text="Mounted Element"
        onPress={handleNavigate(APP_SCREEN.MOUNTED_ELEMENT)}
      />
      <ItemFunction
        text="Sensor Wallpaper"
        onPress={handleNavigate(APP_SCREEN.SENSOR_WALLPAPER)}
      />
      <ItemFunction
        text="Swipe Sort"
        onPress={handleNavigate(APP_SCREEN.SWIPE_SORT)}
      />
      <ItemFunction
        text="Card 3D"
        onPress={handleNavigate(APP_SCREEN.CARD_3D)}
      />
      <ItemFunction
        text="Refresh Island"
        onPress={handleNavigate(APP_SCREEN.REFRESH_ISLAND)}
      />
      <ItemFunction
        text="Color Filter"
        onPress={handleNavigate(APP_SCREEN.COLOR_FILTER)}
      />
      <ItemFunction
        text="Scratch Ticket"
        onPress={handleNavigate(APP_SCREEN.SCRATCH_TICKET)}
      />
      <ItemFunction
        text="Telegram Lock"
        onPress={handleNavigate(APP_SCREEN.TELEGRAM_LOCK)}
      />
      <ItemFunction
        text="Icon Mask Transition"
        onPress={handleNavigate(APP_SCREEN.ICON_MASK_TRANSITION)}
      />
      <ItemFunction
        text="Like Button"
        onPress={handleNavigate(APP_SCREEN.LIKE_BUTTON)}
      />
      <ItemFunction
        text="Infinity Dot"
        onPress={handleNavigate(APP_SCREEN.INFINITY_DOT)}
      />
      <ItemFunction
        text="Line Chart"
        onPress={handleNavigate(APP_SCREEN.LINE_CHART)}
      />
      <ItemFunction
        text="Pie Chart"
        onPress={handleNavigate(APP_SCREEN.PIE_CHART)}
      />
      <ItemFunction
        text="Tiktok Remix"
        onPress={handleNavigate(APP_SCREEN.TIKTOK_REMIX)}
      />
      <ItemFunction text="ADN" onPress={handleNavigate(APP_SCREEN.ADN)} />
      <View style={{ height: bottom + 10 }} />
    </ScrollView>
  );
};
