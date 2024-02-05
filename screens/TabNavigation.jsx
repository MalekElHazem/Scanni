import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../components/Icons';
import Colors from '../constants/Colors';
import ColorScreen from '../constants/ColorScreen';
import * as Animatable from 'react-native-animatable';

import Scan from './Scan';
import Favorite from './Favorite';
import Create from './Create';
import Settings from './Settings';


const TabArr = [
  { route: 'Scan', label: 'Scan', type: Icons.MaterialCommunityIcons, activeIcon: 'qrcode-scan', inActiveIcon: 'line-scan', component: Scan },
  { route: 'Favorite', label: 'Favorite', type: Icons.MaterialIcons, activeIcon: 'favorite', inActiveIcon: 'favorite-border', component: Favorite },
  { route: 'Create', label: 'Create', type: Icons.MaterialCommunityIcons, activeIcon: 'pencil', inActiveIcon: 'pencil-outline', component: Create },
  { route: 'Settings', label: 'Settings', type: Icons.Ionicons, activeIcon: 'settings-sharp', inActiveIcon: 'settings-outline', component: Settings },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
    } else {
      viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1: {scale: 1, rotate: '0deg'}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? Colors.primary : Colors.primaryLite} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})



