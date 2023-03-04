import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import notifee from '@notifee/react-native';
export function Notification() {
  async function handleNotifcation() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Computer toglii</span></p></b></p> &#127917;',
      subtitle: '&#129395;',
      body: '&#127881;!',
      android: {
        channelId,
        color: '#4caf50',
      },
    });
  }
  return (
    <SafeAreaView>
      <Text>Text</Text>
      <Button title="getNotif" onPress={handleNotifcation} />
    </SafeAreaView>
  );
}
