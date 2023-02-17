import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator as createStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from './navigation-service';
import {APP_SCREEN, RootStackParamList} from './screen-type';

import {ADN} from '../features/adn';
import {Card3D} from '../features/card-3d';
import {CardGradient} from '../features/card-gradient';
import {CardRotate} from '../features/card-rotate';
import {ColorFilter} from '../features/color-filter';
import {Home} from '../features/home';
import {IconMaskTransition} from '../features/icon-mask-transition';
import {InfinityDot} from '../features/infinity-dot';
import {LikeButton} from '../features/like-button';
import {LineChart} from '../features/line-chart';
import {MountedElement} from '../features/mounted-element';
import {PieChart} from '../features/pie-chart';
import {RefreshIsland} from '../features/refresh-island';
import {ScratchTicket} from '../features/scratch-tickets';
import {SensorWallpaper} from '../features/sensor-wallpaper';
import {SpaceButton} from '../features/space-button';
import {SwipeSort} from '../features/swipe-sort';
import {TelegramLock} from '../features/telegram-lock';
import {TiktokRemix} from '../features/tiktok-remix';
import {DarkLightMode} from '../features/dark-light-mode';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // render
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      <RootStack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <RootStack.Screen
          options={{title: 'Home'}}
          name={APP_SCREEN.HOME}
          component={Home}
        />
        <RootStack.Screen
          options={{title: 'Card Rotate'}}
          name={APP_SCREEN.CARD_ROTATE}
          component={CardRotate}
        />
        <RootStack.Screen
          options={{title: 'Space Button'}}
          name={APP_SCREEN.SPACE_BUTTON}
          component={SpaceButton}
        />
        <RootStack.Screen
          options={{title: 'Card Gradient'}}
          name={APP_SCREEN.CARD_GRADIENT}
          component={CardGradient}
        />
        <RootStack.Screen
          options={{title: 'Mounted Element'}}
          name={APP_SCREEN.MOUNTED_ELEMENT}
          component={MountedElement}
        />
        <RootStack.Screen
          options={{title: 'Sensor Wallpaper'}}
          name={APP_SCREEN.SENSOR_WALLPAPER}
          component={SensorWallpaper}
        />
        <RootStack.Screen
          options={{title: 'Swipe Sort'}}
          name={APP_SCREEN.SWIPE_SORT}
          component={SwipeSort}
        />
        <RootStack.Screen
          options={{title: 'Card 3D'}}
          name={APP_SCREEN.CARD_3D}
          component={Card3D}
        />
        <RootStack.Screen
          options={{title: 'Refresh Island'}}
          name={APP_SCREEN.REFRESH_ISLAND}
          component={RefreshIsland}
        />
        <RootStack.Screen
          options={{title: 'Color Filter'}}
          name={APP_SCREEN.COLOR_FILTER}
          component={ColorFilter}
        />
        <RootStack.Screen
          options={{title: 'Scratch Ticket'}}
          name={APP_SCREEN.SCRATCH_TICKET}
          component={ScratchTicket}
        />
        <RootStack.Screen
          options={{title: 'Telegram Lock'}}
          name={APP_SCREEN.TELEGRAM_LOCK}
          component={TelegramLock}
        />
        <RootStack.Screen
          options={{title: 'Icon Mask Transition'}}
          name={APP_SCREEN.ICON_MASK_TRANSITION}
          component={IconMaskTransition}
        />
        <RootStack.Screen
          options={{title: 'Like Button'}}
          name={APP_SCREEN.LIKE_BUTTON}
          component={LikeButton}
        />
        <RootStack.Screen
          options={{title: 'Infinity Dot'}}
          name={APP_SCREEN.INFINITY_DOT}
          component={InfinityDot}
        />
        <RootStack.Screen
          options={{title: 'Line Chart'}}
          name={APP_SCREEN.LINE_CHART}
          component={LineChart}
        />
        <RootStack.Screen
          options={{title: 'Pie Chart'}}
          name={APP_SCREEN.PIE_CHART}
          component={PieChart}
        />
        <RootStack.Screen
          options={{title: 'Tiktok remix'}}
          name={APP_SCREEN.TIKTOK_REMIX}
          component={TiktokRemix}
        />
        <RootStack.Screen
          options={{title: 'ADN'}}
          name={APP_SCREEN.ADN}
          component={ADN}
        />
        <RootStack.Screen
          options={{title: 'Dark Light Mode'}}
          name={APP_SCREEN.DARK_LIGHT_MODE}
          component={DarkLightMode}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
