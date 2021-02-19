import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Text';
import {colors} from '../../utils';
import {RectButton} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 15,
  },
  block: {
    width: '100%',
  },
});

function CustomButton({
  disable,
  style,
  bg,
  title,
  onPress,
  block,
  rippleColor,
  border,
  textStyle,
  align,
  color,
  size,
  type,
  ...otherProps
}) {
  // warna bisa dipilih dari /src/utils/colors
  const bgStyle = {
    backgroundColor:
      bg && bg.includes('#')
        ? bg
        : disable
        ? colors['gray']
        : colors[bg || 'gray'],
  };
  const defaultColor =
    color && color.includes('#')
      ? color
      : disable
      ? colors['red']
      : colors[color || 'white'];
  const defaultType = type || 'Medium';
  const defaultAlign = align || 'center';
  const defaultSize = size || 'xl';
  const borderStyle = border && {
    borderWidth: 1,
    borderColor: border.includes('#')
      ? border
      : disable
      ? colors['white']
      : colors[border],
  };

  return (
    <RectButton
      onPress={!disable && onPress}
      rippleColor={rippleColor}
      {...otherProps}>
      <View
        style={[
          styles.wrapper,
          block && styles.block,
          style,
          bgStyle,
          borderStyle,
        ]}>
        <Text
          style={textStyle}
          color={defaultColor}
          type={defaultType}
          size={defaultSize}
          align={defaultAlign}>
          {title}
        </Text>
      </View>
    </RectButton>
  );
}

export default CustomButton;
