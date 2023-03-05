import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ImagePicker, Notification, Contacts} from '../screens';

function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="ImagePicker" component={ImagePicker} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Contacts" component={Contacts} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;
