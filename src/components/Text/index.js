import React from 'react';
import {Text} from 'react-native';

import {colors, sizes, font} from '../../utils';

function CustomText({
  style,
  children,
  color,
  size,
  type,
  align,
  ...otherProps
}) {
  const colorStyle = {
    color: color && color.includes('#') ? color : colors[color || 'black'],
  };
  const fontSizeStyle = {
    fontSize: Number.isInteger(size) ? size : sizes[size || 's'],
  };
  const fontFamilyStyle = {fontFamily: font[type || 'Regular']};
  const textAlignment = {textAlign: align || 'left'};

  return (
    <Text
      style={[colorStyle, fontSizeStyle, fontFamilyStyle, textAlignment, style]}
      {...otherProps}>
      {children}
    </Text>
  );
}

export default CustomText;
