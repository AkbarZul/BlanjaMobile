import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LogoSplash from '../../assets/images/Vector.png';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.background}>
      <Image source={LogoSplash} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
