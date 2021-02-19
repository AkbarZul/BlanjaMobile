import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Header = () => {
  return (
    <View>
      <Image
        style={styles.imageHeader}
        source={require('../../assets/images/header.png')}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  imageHeader: {
    width: '100%',
    height: 260,
  },
});
