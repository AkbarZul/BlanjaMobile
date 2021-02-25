import React, {useState, useEffect} from 'react';
import {Button} from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import blanja from '../../../assets/images/Vector.png';
import {connect, useSelector} from 'react-redux';
import {logout} from '../../../utils/redux/action/authAction';
import axios from 'axios';
import {API_URL} from '@env';
import {Text} from '../../../components';
import {colors} from '../../../utils';

const ProfileScreen = ({navigation, logout}) => {
  const level = useSelector((state) => state.authReducer.level);
  const token = useSelector((state) => state.authReducer.token);
  const user_id = useSelector((state) => state.authReducer.user_id);
  const fullname = useSelector((state) => state.authReducer.fullname);
  const email = useSelector((state) => state.authReducer.email);
  // console.log('nyoba', email, fullname);
  // console.log('ini token', token);

  const [alamat, setAlamat] = useState(0);
  const [historyOrders, setHistoryOrders] = useState(0);
  const [products, setProduct] = useState(0);
  const [orders, setOrder] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const getProductsSeller = () => {
    axios
      .get(`${API_URL}/products/user?keyword=created_at DESC`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const product = res.data.data;
        setProduct(product.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getIncomeOrders = () => {
    axios
      .get(`${API_URL}/orders/seller`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const orderIncome = res.data.data;
        setOrder(orderIncome.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHistoryOrders = () => {
    axios
      .get(`${API_URL}/orders`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const historyOrders = res.data.data;
        setHistoryOrders(historyOrders.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAddressUser = () => {
    axios
      .get(`${API_URL}/address`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setAlamat(address.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = async () => {
    await axios
      .delete(API_URL + '/auth/logout', {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then(async (res) => {
        logout(token, user_id, level);
        console.log('done');
        navigation.navigate('Profile');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (level === 1) {
      getAddressUser();
      getHistoryOrders();
    } else {
      getProductsSeller();
      getIncomeOrders();
    }
  }, [user_id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (level === 1) {
        getAddressUser();
        getHistoryOrders();
      } else {
        getProductsSeller();
        getIncomeOrders();
      }
    });
    return unsubscribe;
  }, [navigation, user_id]);

  return (
    <>
      <View style={{marginTop: 30, marginLeft: 15}}>
        <Text children="My Profile" size="xl3" style={styles.myprofile} />
      </View>
      <ScrollView style={styles.container}>
        {level !== 1 && level !== 2 ? (
          <>
            <View style={{marginVertical: '50%'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image source={blanja} style={{alignItems: 'center'}} />
              </View>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => navigation.navigate('Login')}>
                <Text color="white" size="xl">
                  Login
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  marginVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text size="m">Don't have Blanjapedia account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text color="red" size="m">
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : level === 1 ? (
          <>
            <View
              style={{display: 'flex', flexDirection: 'row', marginBottom: 50}}>
              <View style={{marginRight: 10}}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/images/myprofile.png')}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text children={fullname} size="xl" style={{width: '100%'}} />
                <Text children={email} size="m" color="gray" />
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('MyOrders')}>
                <View>
                  <Text children="My orders" size="xl" />
                  <Text
                    children={`Already have ${historyOrders} orders`}
                    size="m"
                    color="gray"
                  />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('Shipping address')}>
                <View>
                  <Text children="Shipping address" size="xl" />
                  <Text children={`${alamat} address`} size="m" color="gray" />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('Settings')}>
                <View>
                  <Text children="Settings" size="xl" />
                  <Text
                    children="Notification, password"
                    size="m"
                    color="gray"
                  />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                // onPress={() => navigation.navigate('Chat')}>
                onPress={() => navigation.navigate('ListChat')}>
                <View>
                  <Text children="Chatting" size="xl" />
                  <Text children="Chatting" size="m" color="gray" />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnLogout}
              onPress={() => setModalVisible(true)}>
              <Text color="white" size="xl">
                Logout
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{display: 'flex', flexDirection: 'row', marginBottom: 50}}>
              <View style={{marginRight: 10}}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/images/myprofile.png')}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text children={fullname} size="xl" />
                <Text children={email} size="m" color="gray" />
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('ProductSeller')}>
                <View>
                  <Text children="View Product" size="xl" />
                  <Text
                    children={`View all product seller, You Have ${products} products`}
                    size="m"
                    color="gray"
                  />
                </View>

                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('MyOrders')}>
                <View>
                  <Text children="My orders" size="xl" />
                  <Text
                    children={`Already have ${orders} orders`}
                    size="m"
                    color="gray"
                  />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('Settings')}>
                <View>
                  <Text children="Settings" size="xl" />
                  <Text
                    children="Notification, password"
                    size="m"
                    color="gray"
                  />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.order}
                // onPress={() => navigation.navigate('Chat')}>
                onPress={() => navigation.navigate('ListChat')}>
                <View>
                  <Text children="Chatting" size="xl" />
                  <Text children="Chatting" size="m" color="gray" />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnLogout}
              onPress={() => setModalVisible(true)}>
              <Text color="white" size="xl">
                Logout
              </Text>
            </TouchableOpacity>
          </>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          // hardwareAccelerated={true}
          statusBarTranslucent={true}
          visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure want to logout?</Text>
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
                  style={{...styles.closeButton, backgroundColor: colors.red}}
                  onPress={() => {
                    handleLogout();
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  myprofile: {
    fontWeight: 'bold',
    // marginBottom: 50,
  },
  btnLogin: {
    width: '80%',
    backgroundColor: colors.red,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogout: {
    width: '80%',
    backgroundColor: colors.red,
    paddingVertical: 10,
    bottom: 0,
    marginBottom: 20,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {},
  img: {
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  editWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token, user_id, level) => dispatch(logout(token, user_id, level)),
  };
};

export default connect(null, mapDispatchToProps)(ProfileScreen);