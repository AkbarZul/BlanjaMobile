import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Text, ButtonSubmit} from '../../../components';
import axios from 'axios';
import {connect, useSelector} from 'react-redux';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
import {Rating, AirbnbRating} from 'react-native-ratings';
// import {API_URL} from '@env';
import {TextInput} from 'react-native-gesture-handler';

const actionSheetRef = createRef();
const OrderDetails = ({navigation, route}) => {
  const API_URL = 'http://192.168.1.2:8007';
  const {itemId, item, categories} = route.params;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [errMsg, setErrMsg] = useState(false);
  const [productId, setProductId] = useState('');
  const [orderDetail, setOrderDetail] = useState({});
  const token = useSelector((state) => state.authReducer.token);

  console.log('rating', rating);
  console.log('review', review);
  console.log('itemId', productId);

  const getOrderDetail = async () => {
    await axios
      .get(`${API_URL}/orders/${itemId}`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const order = res.data.data;
        const id = res.data.data.order_detail;

        console.log('BY ID ', order);
        setOrderDetail(order);
      })
      .catch((err) => {
        setErrMsg(true);
        console.log(err);
      });
  };
  const toastReview = () => {
    ToastAndroid.show(
      `Thank you, your feedback has been added!`,
      ToastAndroid.SHORT,
    );
  };

  const toastReviewFailed = () => {
    ToastAndroid.show(
      `Sorry, you have reviewed this product!`,
      ToastAndroid.SHORT,
    );
  };

  const postReview = async () => {
    const data = {
      product_id: productId,
      review: review,
      rating: rating,
    };
    await axios
      .post(`${API_URL}/review`, data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        // setErrMsg(false);
        console.log('Success add review');
        toastReview();
        actionSheetRef.current?.hide();
      })
      .catch((err) => {
        // if (status === 403) {
        // setErrMsg(true);
        console.log(err, 'error add rating');
        toastReviewFailed();
        // }
      });
  };

  // const submitReview = () => {
  //   postReview();
  //   if (errMsg === true) {
  //     toastReviewFailed();
  //   } else {
  //     toastReview();
  //     actionSheetRef.current?.hide();
  //   }
  // };

  useEffect(() => {
    getOrderDetail();
  }, [itemId]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            children={`Order No. ${orderDetail.transaction_code}`}
            size="l"
            type="Bold"
            style={styles.textOrderNo}
          />
          <Text
            children={moment(orderDetail.created_at).format('DD-MM-YYYY')}
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
              children={orderDetail.status_order}
              style={styles.textOrderNo}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            children={
              orderDetail.order_detail !== undefined &&
              orderDetail.order_detail.length
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

        {/* Awalan looping Card */}
        {orderDetail.order_detail !== undefined &&
          orderDetail.order_detail.map(
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
            }) => {
              return (
                <View style={styles.card} key={product_id}>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: 5,
                          // justifyContent: 'center',
                          // width: '100%',
                        }}>
                        <TouchableOpacity
                          style={styles.btn}
                          bg="red"
                          onPress={() => {
                            setProductId(product_id);

                            actionSheetRef.current?.setModalVisible();
                          }}>
                          <Text style={{color: 'white'}}>Leave Feedback</Text>
                        </TouchableOpacity>
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
              children={orderDetail.address}
              color="black"
              size="l"
              style={{flexShrink: 1}}
            />
          </View>
          {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Payment method: " color="gray" size="l" />
            <Text
              children="7823 2525 4602 2829"
              color="black"
              size="l"
              style={{right: -2}}
            />
          </View> */}
          {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Delivery method: " color="gray" size="l" />
            <Text
              children="FedEx, 3 days, $ 15"
              color="black"
              size="l"
              style={{right: -6}}
            />
          </View> */}
          {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Discount: " color="gray" size="l" />
            <Text
              children="10%, Personal promo code"
              color="black"
              size="l"
              style={{right: -60}}
            />
          </View> */}
          <View style={{flexDirection: 'row'}}>
            <Text children="Total Amount: " color="gray" size="l" />
            <View>
              <Text
                children={`Rp.${orderDetail.total}`}
                color="black"
                size="l"
                style={{right: -30}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          marginHorizontal: 10,
          bottom: 0,
          justifyContent: 'space-between',
        }}></View>
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
});

export default OrderDetails;