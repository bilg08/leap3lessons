import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ImagePicker, Notification} from '../screens';

function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="ImagePicker" component={ImagePicker} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;
