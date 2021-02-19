import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, ButtonSubmit} from '../../../components';
import axios from 'axios';
import {connect, useSelector} from 'react-redux';
import moment from 'moment';
import {API_URL} from '@env';

const OrderDetails = ({navigation, route}) => {
  const {itemId, item, categories} = route.params;
  const [orderDetail, setOrderDetail] = useState({});
  const token = useSelector((state) => state.authReducer.token);

  const getOrderDetail = async () => {
    await axios
      .get(`${API_URL}/orders/${itemId}`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const order = res.data.data;
        console.log('BY ID ', order);
        setOrderDetail(order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <Text children={orderDetail.status_order} style={styles.textOrderNo} />
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
                        source={{uri: `${JSON.parse(product_photo).shift()}`}}
                      />
                    </View>
                    <View style={{paddingVertical: 10}}>
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
                        <View style={{flexDirection: 'row'}}>
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
                        <View style={{alignContent: 'flex-end'}}>
                          <Text
                            children={`Rp.${sub_total_item}`}
                            style={styles.textOrderValue}
                          />
                        </View>
                      </View>
                      
                    </View>
                  </View>
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
      {/* <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          marginHorizontal: 10,
          bottom: 0,
          justifyContent: 'space-between',
        }}>
        
        <View>
          <ButtonSubmit title="Leave feddback" style={styles.btn} bg="red" />
        </View>
      </View> */}
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
    width: '50%',
    paddingHorizontal: 0,
  },
});

export default OrderDetails;
