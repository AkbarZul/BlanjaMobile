import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import success from '../../assets/images/success.png';
import {colors, sizes} from '../../utils';

const SuccessScreen = ({navigation}) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={styles.container}>
        <ImageBackground source={success} style={styles.image}>
          <View style={{marginTop: 50}}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.txtSuccess}>Success!</Text>
              <Text style={styles.txtSuccess2}>
                Your order will be delivered soon.
              </Text>
              <Text style={styles.txtSuccess2}>
                Thank you for choosing our app!
              </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                underlayColor="white"
                onPress={() => navigation.navigate('Home')}
                style={styles.btn}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Continue shopping
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btn: {
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.red,
    color: colors.white,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 13,
  },
  txtSuccess: {
    fontSize: sizes.xl3,
    fontWeight: '800',
    marginVertical: 10,
  },
  txtSuccess2: {
    fontSize: sizes.l,
    fontWeight: '800',
    marginVertical: 5,
  },
});

export default SuccessScreen;
