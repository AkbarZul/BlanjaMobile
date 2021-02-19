import React, {useState} from 'react';
import {StyleSheet, View, TextInput, KeyboardAvoidingView} from 'react-native';
// import Icon from '../CustomIcon';
import Text from '../Text';
import {colors, sizes, font} from '../../utils';

function FormInput({
  style,
  iconStyle,
  inputStyle,
  icon,
  rightIcon,
  label,
  labelStyle,
  right,
  rightStyle,
  pickerComponent,
  error,
  ...otherProps
}) {
  const [isFocus, setIsFocus] = useState(false);

  const focusChange = (val) => (e) => setIsFocus(val);

  return (
    <KeyboardAvoidingView style={style}>
      {label && (
        <View>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          {borderColor: isFocus ? colors.deepRed : colors.shallowGray},
        ]}>
        {/* {icon && (
          <Icon
            name={icon}
            size="xl2"
            color="gray"
            style={[styles.icon, iconStyle]}
          />
        )} */}
        {pickerComponent ? (
          pickerComponent
        ) : (
          <TextInput
            style={[styles.input, inputStyle]}
            placeholderTextColor={colors.shallowGray}
            onFocus={focusChange(true)}
            onBlur={focusChange(false)}
            {...otherProps}
          />
        )}
        {/* {rightIcon && (
          <Icon
            name={rightIcon}
            size="xl2"
            color="deepRed"
            style={[iconStyle, styles.rightIcon]}
          />
        )} */}
        {right && <View style={[styles.right, rightStyle]}>{right}</View>}
      </View>
      {error && (
        <Text size="md" color="deepRed" style={{marginTop: 5}}>
          {error[0]}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 7,
  },
  icon: {
    marginRight: 15,
  },
  rightIcon: {
    marginLeft: 15,
  },
  input: {
    flex: 1,
    padding: 0,
    paddingVertical: 8,
    fontSize: sizes.l,
    fontFamily: font.Regular,
    color: colors.black,
  },
  label: {
    color: '#A3A3A3',
  },
  right: {},
});

export default FormInput;
