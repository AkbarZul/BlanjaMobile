import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Text from '../../../components/Text';
// import {API_URL} from '@env';
import axios from 'axios';
import {useSelector} from 'react-redux';

const ShippingAddress = ({navigation, route}) => {
  const API_URL = 'http://192.168.1.2:8007';
  const [alamat, setAlamat] = useState([]);
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
                      }}>
                      <Text children={fullname} size={20} />
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
                    <Text
                      children={`${address}, ${city}, ${region}, ${zip_code}, ${country}`}
                      size={17}
                      type="Medium"
                      style={styles.address}
                    />
                  </View>
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
});
