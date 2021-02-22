import React, {useState, useEffect} from 'react';
import {Button} from 'native-base';
import {
  StyleSheet,
  Modal,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../../../components/Text';
// import {API_URL} from '@env';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {colors} from '../../../utils';

const ShippingAddress = ({navigation, route}) => {
  const API_URL = 'http://192.168.1.2:8007';
  const [alamat, setAlamat] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    getAddressUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAddressUser();
    });
    return unsubscribe;
  }, [navigation]);

  const getAddressUser = async () => {
    await axios
      .get(`${API_URL}/address`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setAlamat(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toastDelete = () => {
    ToastAndroid.show(
      `Delete address successfull.`,
      ToastAndroid.SHORT,
    );
  };
  const deleteAddress = (id) => {
    axios
      .delete(`${API_URL}/address/${id}`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('Delete address success');
        getAddressUser();
        toastDelete();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <View style={styles.container}>
        <View style={styles.Search}>
          <TextInput placeholder="Search" style={styles.form} />
          <Icon name="search" color="gray" size={30} style={styles.icon} />
        </View>
        <Text children="Shipping address" size={30} style={styles.title} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {alamat.map(
            ({
              id_address,
              fullname,
              address,
              city,
              region,
              zip_code,
              country,
            }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CheckOut', {
                      id_address,
                      fullname,
                      address,
                      city,
                      region,
                      zip_code,
                      country,
                    });
                  }}
                  key={id_address}>
                  <View style={styles.card}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text
                        children={fullname}
                        size={20}
                        style={{width: '50%'}}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Update Shipping Address', {
                            id: id_address,
                            Fullname: fullname,
                            Address: address,
                            City: city,
                            Region: region,
                            Zipcode: zip_code,
                            Country: country,
                          })
                        }>
                        <Text children="Change" color="red" size="l" />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        children={`${address}, ${city}, ${region}, ${zip_code}, ${country}`}
                        size={17}
                        type="Medium"
                        style={styles.address}
                        style={{width: '60%'}}
                      />
                      <TouchableOpacity>
                        <Iconn
                          name="delete"
                          size={25}
                          color={colors.red}
                          onPress={() => setModalVisible(true)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    hardwareAccelerated={true}
                    visible={modalVisible}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                          Are you sure want to delete address?
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
                            <Text
                              style={{...styles.textStyle, color: colors.red}}>
                              No
                            </Text>
                          </Button>
                          <Button
                            style={{
                              ...styles.closeButton,
                              backgroundColor: colors.red,
                            }}
                            onPress={() => {
                              deleteAddress(id_address);
                              setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Yes</Text>
                          </Button>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </TouchableOpacity>
              );
            },
          )}
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DB3022"
            onPress={() => navigation.navigate('Adding Shipping Address')}
            style={styles.button}>
            <Text children="ADD NEW ADDRESS" size="l" />
          </TouchableHighlight>
        </ScrollView>
      </View>
    </>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    height: '100%',
    paddingHorizontal: 20,
  },
  Search: {
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 5,
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 50,
    borderWidth: 0,
    borderRadius: 23,
  },
  icon: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 20,
  },
  title: {
    paddingVertical: 20,
  },
  card: {
    padding: 10,
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  address: {
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 21,
    marginRight: 140,
    letterSpacing: 0.15,
    paddingVertical: 15,
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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