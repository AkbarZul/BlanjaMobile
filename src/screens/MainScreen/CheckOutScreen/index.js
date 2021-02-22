import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import {
  clearCart,
  clearCheckout,
  addToCheckout,
} from '../../../utils/redux/action/cartAction';
import {connect, useSelector} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {
  showNotification,
  handleCancel,
  handleScheduledNotification,
} from '../../../notification';

const CheckOut = ({checkout, clearCart, navigation, route}) => {
  console.log('ROUTE', route.params);
  const {
    id_address,
    fullname,
    address,
    city,
    region,
    zip_code,
    country,
  } = route.params;
  const [checkbox, setCheckbox] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [alamat, setAlamat] = useState([]);

  const channel = 'notification';

  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'notification',
        channelName: 'My Notification channel',
        channelDescription: 'A channel to categories your notification',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createchannel returned ${created}`),
    );
    // code to run on component mount
  }, []);

  useEffect(() => {
    PushNotification.getChannels((channel_ids) => {
      console.log('CHANNEL', channel_ids[0]);
      () => navigation.navigate('Home');
    });
    getAddressUser();
    handleSubmit();
  }, []);

  const getAddressUser = async () => {
    await axios
      .get(`${API_URL}/address`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const address = res.data.data[0];
        setAlamat(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const transaction = async () => {
    await axios
      .post(`${API_URL}/orders`, kirim, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('success', kirim);
      })
      .catch((err) => {
        console.log('ERROR', err.response);
      });
    clearCart();
    // clearCheckout();
  };

  const kirim = {
    item: checkout.item,
    transaction_code: checkout.transaction_code,
    id_address: id_address,
    seller_id: checkout.seller_id,
  };
  addToCheckout({kirim});

  const handleSubmit = () => {
    const checkbox = {
      checkbox: false,
      checkbox2: false,
    };
    setCheckbox(checkbox.checkbox);
    setCheckbox2(checkbox.checkbox2);
  };

  console.log('checkout', checkout);
  console.log('checkout', kirim);
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.address}>Shiping address</Text>
        {/* {address.map(
          ({id_address, fullname, address, city, state, zip_code, country}) => {
            return ( */}
        {route.params.id_address !== undefined ? (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text>{fullname}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Shipping address')}>
                <Text style={{color: 'red'}}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text>{`${address}, ${city}`}</Text>
              <Text>{`${region}, ${zip_code}, ${country}`}</Text>
            </View>
          </View>
        ) : route.params.id_address === undefined && alamat !== undefined ? (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text>{alamat.fullname}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Shipping address')}>
                <Text style={{color: 'red'}}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text>{`${alamat.address}, ${alamat.city}`}</Text>
              <Text>{`${alamat.region}, ${alamat.zip_code}, ${alamat.country}`}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <View
              style={{
                marginTop: 15,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Adding Shipping Address')}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    paddingVertical: '10%',
                    fontSize: 20,
                  }}>
                  Add Shipping Address
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Text style={styles.payment}>Payment</Text>
        <View>
          <View style={styles.checkboxcontainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.master}>
                <Image
                  source={require('../../../assets/images/mastercard.png')}
                />
              </View>
              <Text size="l" children="MasterCard" style={{marginLeft: 20}} />
            </View>
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={checkbox}
              onValueChange={(checkbox) => setCheckbox(checkbox)}
            />
          </View>
        </View>
        <View>
          <View style={styles.checkboxcontainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.master}>
                <Image source={require('../../../assets/images/pos.png')} />
              </View>
              <Text
                size="l"
                children="Pos Indonesia"
                style={{marginLeft: 20}}
              />
            </View>
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              value={checkbox2}
              onValueChange={(checkbox2) => setCheckbox2(checkbox2)}
            />
          </View>
        </View>
        <View>
          <View style={styles.checkboxcontainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.master}>
                <Image source={require('../../../assets/images/gopay.png')} />
              </View>
              <Text size="l" children="Gopay" style={{marginLeft: 20}} />
            </View>
            <CheckBox
              tintColors={{true: '#DB3022', false: '#9B9B9B'}}
              // value={this.state.check3}
              // onChange={() => this.handleCheckBox3()}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.order}>
          <Text style={styles.order2}>Order:</Text>
          <Text style={styles.order3}>
            Rp.
            {checkout.item
              .map((index) => {
                return index.sub_total_item;
              })
              .reduce((a, b) => {
                return a + b;
              }, 0)
              .toLocaleString('id-ID')}
          </Text>
        </View>

        <View style={styles.order}>
          <Text style={styles.order2}>Delivery:</Text>
          <Text style={styles.order3}>Rp.5000</Text>
        </View>

        <View style={styles.order}>
          <Text style={styles.summary}>Summary:</Text>
          <Text style={styles.price}>
            Rp.
            {checkout.item
              .map((index) => {
                return index.sub_total_item;
              })
              .reduce((a, b) => {
                return a + b;
              }, 5000)
              .toLocaleString('id-ID')}
          </Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DB3022"
          onPress={() =>
            Alert.alert(
              'Confirm',
              'Are you sure to process this order ?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    transaction(),
                      clearCart(),
                      showNotification(
                        'Congratulations!',
                        'Your transaction successfull.',
                        channel,
                      ),
                      navigation.navigate('Success');
                  },
                },
              ],
              {cancelable: false},
            )
          }
          style={styles.button}>
          <Text>SUBMIT ORDER</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 15,
  },

  address: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
  },

  payment: {
    marginVertical: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    height: 108,
    // elevation: 20,
    borderRadius: 20,
    marginTop: 50,
    paddingHorizontal: 15,
  },

  checkboxcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
  },

  master: {
    width: 64,
    height: 38,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  bottom: {
    width: '100%',
    height: 220,
    backgroundColor: '#ffffff',
    bottom: 0,
    borderRadius: 30,
    paddingHorizontal: 15,
  },

  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 20,
  },

  order2: {
    fontSize: 14,
    color: 'gray',
    //   fontWeight: 'bold',
  },

  order3: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  summary: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },

  price: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    // border: 'none',
    // width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    // marginLeft: 10,
    width: '100%',
    // paddingHorizontal: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    checkout: state.cart.checkout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
    clearCheckout: () => dispatch(clearCheckout()),
    addToCheckout: ({kirim}) => dispatch(addToCheckout({kirim})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);