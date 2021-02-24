import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Modal} from 'react-native';
import {Button} from 'native-base';
import Toast from 'react-native-toast-message';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL} from '@env';
import {colors} from '../../../utils';
import {Text} from '../../../components';

const ProductSeller = ({navigation}) => {
  //   const {itemId} = route.params;
  const [product, setProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
        setProduct(product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(`${API_URL}/products/${id}`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success delete product',
          visibilityTime: 4000,
          autoHide: true,
        });
        console.log('SUCCESS DELETE', res.data);
        getProductsSeller();
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
        style={styles.gridView}
        spacing={10}
        renderItem={({item}) => (
          <>
            <View style={styles.containerCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailProduct', {
                    itemId: item.id,
                    categories: item.category_name,
                  })
                }>
                <View
                  style={[styles.itemContainer, {backgroundColor: 'white'}]}>
                  <Image
                    source={{
                      uri: `${API_URL}${JSON.parse(
                        item.product_photo,
                      ).shift()}`,
                    }}
                    style={{
                      borderRadius: 10,
                      width: '100%',
                      height: 100,
                    }}
                    resizeMode="contain"
                  />
                  <View style={{marginVertical: 5}}>
                    <Text style={styles.itemName}>{item.product_name}</Text>
                    <Text style={styles.itemCode}>Rp.{item.product_price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UpdateProductSeller', {
                      itemId: item.id,
                    });
                  }}
                  style={[styles.btnEditDelete, {backgroundColor: '#77ff0e'}]}>
                  <Text color="black" size="l">
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnEditDelete}
                  onPress={() => {
                    setModalVisible(true);
                    // deleteProduct(item.id);
                  }}>
                  <Text color="white" size="l">
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              // hardwareAccelerated={true}
              statusBarTranslucent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Are you sure want to delete product?
                  </Text>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      width: 250,
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      style={{
                        ...styles.closeButton,
                        backgroundColor: colors.white,
                        borderColor: colors.red,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={{...styles.textStyle, color: colors.red}}>
                        No
                      </Text>
                    </Button>
                    <Button
                      style={{
                        ...styles.closeButton,
                        backgroundColor: colors.red,
                      }}
                      onPress={() => {
                        deleteProduct(item.id);
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.textStyle}>Yes</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </>
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
  containerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  btnEditDelete: {
    backgroundColor: colors.red,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: 50,
  },
  itemContainer: {
    // justifyContent: 'flex-end',
    borderRadius: 10,
    padding: 10,
    height: 180,
    // marginTop: 30,
    // marginBottom: 20,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    // paddingHorizontal: 7,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalView: {
    height: 200,
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#6379F4',
    height: 40,
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
  },
});

export default ProductSeller;
