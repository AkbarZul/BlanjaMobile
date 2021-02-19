import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../CustomButton';
import {colors} from '../../utils';

export default function ButtonSubmit({
  onPress,
  title,
  disable,
  bg,
  rippleColor,
  color
}) {
  return (
    <View style={styles.container}>
      <Button
        disable={disable}
        onPress={onPress}
        title={title || 'Submit'}
        bg={bg}
        rippleColor={rippleColor}
        color={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
