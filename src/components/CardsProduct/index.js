import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardPict, CardPictNew, IconStar, IconStarAct} from '../../assets/icons';

import {colors, font, sizes} from '../../utils';

const CardsProduct = ({navigation, name, brand, price, image, id}) => {
  const url = image;
  console.log(url);
  const img = {uri: `${url}`};
  console.log(typeof image);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailPage', {itemId: id});
        }}>
        <ImageBackground
          source={img}
          style={styles.carpict}
          imageStyle={styles.cardstyle}></ImageBackground>
        <View style={styles.star}>
          {true && (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStar />
            </>
          )}
        </View>
        <Text style={styles.brand}>{brand}</Text>
        <View style={{width: 148}}>
          <Text style={styles.nameProd}>{name}</Text>
        </View>
        <Text style={styles.price}>Rp.{price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardsProduct;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  carpict: {
    height: 184,
    width: 148,
    borderRadius: 8,
  },
  cardstyle: {
    borderRadius: 8,
    resizeMode: 'cover',
  },
  star: {
    flexDirection: 'row',
  },
  brand: {
    fontSize: 11,
    fontFamily: font.Regular,
    color: colors.gray,
  },
  nameProd: {
    fontSize: 15,
    fontFamily: font.Bold,
  },
  price: {
    fontSize: 14,
    fontFamily: font.Regular,
  },
});
