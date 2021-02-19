import React from 'react';
import {TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';

const showNotification = (tittle, message, channelId, navigation) => {
  <TouchableOpacity onPress={() => navigation.navigate('Home')} />;
  PushNotification.localNotification({
    channelId,
    tittle,
    message,
  });
};

const handleScheduledNotification = (tittle, message, channelId) => {
  PushNotification.localNotificationSchedule({
    channelId,
    tittle,
    message,
    date: new date(Date.now() + 5 * 1000),
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {showNotification, handleCancel, handleScheduledNotification};
