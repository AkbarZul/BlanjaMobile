import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {FloatingMenu} from 'react-native-floating-action-menu';

// import {API_URL} from '@env';

const ProductSeller = ({navigation, route}) => {
  const API_URL = 'http://192.168.1.2:8007';
  //   const {itemId} = route.params;
  const [product, setProduct] = useState([]);
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    getProductsSeller();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProductsSeller();
    });
    return unsubscribe;
  }, [navigation]);

  const getProductsSeller = () => {
    axios
      .get(`${API_URL}/products/user?keyword=created_at DESC`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const product = res.data.data;
        console.log('Anjim', product);
        setProduct(product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FlatGrid
        itemDimension={130}
        data={product}
        style={StyleSheet.gridView}
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailProduct', {
                itemId: item.id,
                categories: item.category_name,
              })
            }>
            <View style={[styles.itemContainer]}>
              <Image
                source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                style={{
                  borderRadius: 10,
                  width: '100%',
                  height: 170,
                }}
                resizeMode="contain"
              />
              <Text style={styles.itemName}>{item.product_name}</Text>
              <Text style={styles.itemCode}>Rp.{item.product_price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        // activeOpacity={0.2}
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.TouchableOpacityStyle}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
          }}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    marginTop: 30,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});

export default ProductSeller;
