import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from 'react-native';
import {Text, ButtonSubmit} from '../../../components';
import axios from 'axios';
import {connect, useSelector} from 'react-redux';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {API_URL} from '@env';
import {TextInput} from 'react-native-gesture-handler';
import {Picker, Button} from 'native-base';
import {colors} from '../../../utils';

const actionSheetRef = createRef();

const OrderStatusScreen = ({navigation, route}) => {
  const {itemId, item, categories} = route.params;
  const [orderStatus, setOrderStatus] = useState({});
  const token = useSelector((state) => state.authReducer.token);
  const [status, setStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const getOrderHistorySellerById = async () => {
    await axios
      .get(`${API_URL}/orders/seller/${itemId}`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const order = res.data.data;
        const id = res.data.data.order_detail;

        setOrderStatus(order);
        setStatus(order.status_order);
      })
      .catch((err) => {
        setErrMsg(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getOrderHistorySellerById();
  }, [itemId]);

  const handleSubmit = async () => {
    const data = new URLSearchParams();
    data.append('status_order', status);
    console.log(`${API_URL}/orders/seller/${itemId}`);

    await axios
      .put(`${API_URL}/orders/seller/${itemId}`, data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        navigation.navigate('MyOrders');
        console.log('bisa update');
        console.log('aku sayang kamu', data);
      })
      .catch((err) => {
        console.log('error disokin');
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            children={`Order No. ${orderStatus.transaction_code}`}
            size="l"
            type="Bold"
            style={styles.textOrderNo}
          />
          <Text
            children={moment(orderStatus.created_at).format('DD-MM-YYYY')}
            size="m"
            color="gray"
            style={styles.textOrderNo}
          />
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <Text
              children="Status : "
              style={styles.textOrderNo}
              color="gray"
            />
            <Text
              children={orderStatus.status_order}
              style={styles.textOrderNo}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            children={
              orderStatus.order_detail !== undefined &&
              orderStatus.order_detail.length
            }
            style={styles.textOrderNo}
            style={{fontWeight: 'bold'}}
          />
          <Text
            children=" Items"
            style={styles.textOrderNo}
            style={{fontWeight: 'bold'}}
          />
        </View>
        {orderStatus.order_detail !== undefined &&
          orderStatus.order_detail.map(
            ({
              product_id,
              product_name,
              category_name,
              conditions,
              product_qty,
              sub_total_item,
              product_photo,
              id,
              order_id,
            }, index) => {
              return (
                <View style={styles.card} key={index}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image
                        style={styles.img}
                        // source={require('../../../assets/images/womanorder.png')}
                        source={{
                          uri: `${API_URL}${JSON.parse(product_photo).shift()}`,
                        }}
                      />
                    </View>
                    <View
                      style={{paddingVertical: 10, flexDirection: 'column'}}>
                      <Text
                        children={product_name}
                        size="l"
                        style={styles.textOrder}
                      />
                      <Text
                        children={category_name}
                        color="gray"
                        style={styles.textOrder}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            children="Color: "
                            color="gray"
                            style={styles.textOrder}
                          />
                          <Text children="Gray" style={styles.textOrderValue} />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            children="Size: "
                            color="gray"
                            style={styles.textOrder}
                          />
                          <Text children="L" style={styles.textOrderValue} />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{width: '30%', flexDirection: 'row'}}>
                          <Text
                            children="Units: "
                            color="gray"
                            style={styles.textOrder}
                          />
                          <Text
                            children={product_qty}
                            style={styles.textOrderValue}
                          />
                        </View>
                        <View style={{width: '70%'}}>
                          <Text
                            children={`Rp.${sub_total_item}`}
                            style={styles.textOrderValue}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <ActionSheet gestureEnabled ref={actionSheetRef}>
                    <View style={styles.actionSheet}>
                      <View>
                        <Text style={styles.textRate}>What is your rate?</Text>
                      </View>
                      <View style={{marginVertical: 10}}>
                        <AirbnbRating
                          count={5}
                          onFinishRating={(rating) => setRating(rating)}
                          defaultRating={0}
                          size={30}
                          showRating={false}
                        />
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={styles.textRate}>
                          Please share your opinion about the product
                        </Text>
                      </View>
                      <View style={styles.inputReview}>
                        <TextInput
                          placeholder="Write your review..."
                          multiline={true}
                          onChangeText={(review) => setReview(review)}
                          style={{width: '100%', fontSize: 16}}
                        />
                      </View>
                      <View style={{width: '100%'}}>
                        <TouchableOpacity
                          style={styles.btnReview}
                          onPress={() => {
                            postReview();
                          }}>
                          <Text style={{color: 'white'}}>SEND REVIEW</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ActionSheet>
                </View>
              );
            },
          )}
        <Text
          children="Order information"
          size="l"
          style={{fontWeight: '700', marginBottom: 15}}
        />
        <View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Shipping Address: " color="gray" size="l" />
            <Text
              children={orderStatus.address}
              color="black"
              size="l"
              style={{flexShrink: 1}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text children="Total Amount: " color="gray" size="l" />
            <View>
              <Text
                children={`Rp.${orderStatus.total}`}
                color="black"
                size="l"
                style={{right: -30}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{margin: 10}}>
        <Picker
          note
          style={{width: '100%'}}
          mode="dropdown"
          selectedValue={status}
          onValueChange={(itemValue) => {
            setStatus(itemValue);
          }}>
          <Picker.Item label="On Process" value="On Process" />
          <Picker.Item label="Delivery" value="Delivery" />
          <Picker.Item label="Delivered" value="Delivered" />
        </Picker>
        <ButtonSubmit
          title="CHANGE"
          bg="red"
          onPress={() => setModalVisible(true)}
          rippleColor="white"
        />
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
              Are you sure want to change the order status?
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
                <Text style={{...styles.textStyle, color: colors.red}}>No</Text>
              </Button>
              <Button
                style={{...styles.closeButton, backgroundColor: colors.red}}
                onPress={() => {
                  handleSubmit();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Yes</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    // paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  card: {
    width: '100%',
    height: 160,
    paddingRight: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  cardOrder: {
    elevation: 16,
    //   shadowRadius: 10,
    //   shadowOpacity: 0.1,
    //   shadowOffset:{
    //       width: 0,
    //       height: 8,
    //   },
    //   shadowColor: 'red',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  img: {
    width: 130,
    height: 200,
    overflow: 'hidden',
  },
  textOrderNo: {
    marginVertical: 5,
  },
  textOrder: {
    marginVertical: 5,
    marginLeft: 15,
  },
  textOrderValue: {
    marginVertical: 5,
    // paddingStart:15,
  },
  btn: {
    // width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 2,
    backgroundColor: '#DB3022',
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 25,
  },
  actionSheet: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 20,
  },
  textRate: {
    fontSize: 18,
    textAlign: 'center',
    // fontWeight: '700'
  },
  inputReview: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  btnReview: {
    width: '100%',
    backgroundColor: '#DB3022',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    height: 250,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
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
});
export default OrderStatusScreen;