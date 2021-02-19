import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import OutlineInput from 'react-native-outline-input';

import {colors, input} from '../../utils';

const OutlineFormInput = (
  style,
  placeholder,
  value,
  label,
  activeValueColor,
  activeBorderColor,
  activeLabelColor,
  passiveBorderColor,
  passiveLabelColor,
  passiveValueColor,
  ...otherProps
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Value =
    activeValueColor && activeValueColor.includes('#')
      ? activeValueColor
      : colors[activeValueColor || 'black'];

  const Border =
    activeBorderColor && activeBorderColor.includes('#')
      ? activeBorderColor
      : colors[activeBorderColor || 'green'];

  const Bgst =
    activeLabelColor && activeLabelColor.includes('#')
      ? activeLabelColor
      : colors[activeLabelColor || 'black'];

  const passiveborder =
    passiveBorderColor && passiveBorderColor.includes('#')
      ? passiveBorderColor
      : colors[passiveBorderColor || 'black'];

  const passivelabel =
    passiveLabelColor && passiveLabelColor.includes('#')
      ? passiveLabelColor
      : colors[passiveLabelColor || 'black'];

  const passivevalue =
    passiveValueColor && passiveValueColor.includes('#')
      ? passiveValueColor
      : colors[passiveValueColor || 'black'];

      // const labels =  label && label.includes('#') ? label : input[label || 'label1' ]
  return (
    <View>
      <OutlineInput
        value={email}
        onChangeText={(e: string) => setEmail(e)}
        label={label || "user"}
        activeValueColor={Value}
        activeBorderColor={Border}
        activeLabelColor={Bgst}
        passiveBorderColor={passiveborder}
        passiveLabelColor={passivelabel}
        passiveValueColor={passivevalue}
        {...otherProps}
      />
    </View>
  );
};

export default OutlineFormInput;

const styles = StyleSheet.create({});
