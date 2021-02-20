import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from '../../../components/';
import axios from 'axios';
import {connect, useSelector} from 'react-redux';
import moment from 'moment';
// import {API_URL} from '@env';

const MyOrders = ({navigation}) => {
  const API_URL = 'http://192.168.1.2:8007';
  const token = useSelector((state) => state.authReducer.token);
  const level = useSelector((state) => state.authReducer.level);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [tglFormat, setTglFormat] = useState();

  const getHistoryOrders = () => {
    axios
      .get(`${API_URL}/orders`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const historyOrders = res.data.data;
        console.log('DATA ORDER ', historyOrders);
        const tgl = moment(res.data.data.created_at).format('DD-MM-YYYY');
        // console.log('TGL ', tgl);
        setTglFormat(tgl);
        setHistoryOrders(historyOrders);
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
        setOrder(orderIncome);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHistoryOrders();
    getIncomeOrders();
  }, []);

  return (
    <>
      <View style={{marginTop: 30, marginLeft: 10}}>
        <Text
          children="My Orders"
          size="xl3"
          style={{fontWeight: 'bold', marginBottom: 25}}
        />
      </View>
      <ScrollView style={styles.container}>
        {level === 1 ? (
          <>
            {historyOrders.map(
              ({
                id,
                total,
                created_at,
                transaction_code,
                order_detail,
                status_order,
              }) => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate('OrderDetails', {itemId: id})
                    }
                    key={id}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        children={`Transaction Code. ${transaction_code}`}
                        size="l"
                        type="Bold"
                        style={styles.textOrder}
                      />
                      <Text
                        children={moment(created_at).format('DD-MM-YYYY')}
                        size="m"
                        color="gray"
                        style={styles.textOrder}
                      />
                    </View>
                    <View>
                      {/* <View style={{flexDirection: 'row'}}>
                    <Text
                      children="Tracking number: "
                      style={styles.textOrder}
                      color="gray"
                    />
                    <Text children="IW3475453455" style={styles.textOrder} />
                  </View> */}
                      {/* <View style={{flexDirection: 'row'}}>
                    <Text
                      children="Tracking number: "
                      style={styles.textOrder}
                      color="gray"
                    />
                    <Text children="IW3475453455" style={styles.textOrder} />
                  </View> */}
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          children="Quantity: "
                          style={styles.textOrder}
                          color="gray"
                        />
                        <Text
                          children={order_detail.length}
                          style={styles.textOrder}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          children="Total amount: "
                          style={styles.textOrder}
                          color="gray"
                        />
                        <Text
                          children={`Rp.${total}`}
                          style={styles.textOrder}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text children={status_order} color="green" />
                    </View>
                  </TouchableOpacity>
                );
              },
            )}
          </>
        ) : (
          <>
            {order.map(
              ({
                id,
                total,
                created_at,
                transaction_code,
                order_detail,
                status_order,
              }) => {
                return (
                  <TouchableOpacity style={styles.card}>
                    {/* onPress={() => navigation.navigate('OrderDetails',{itemId:id})} key={id} */}
                    <View
                    key={id}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        children={`Transaction Code. ${transaction_code}`}
                        size="l"
                        type="Bold"
                        style={styles.textOrder}
                      />
                      <Text
                        children={moment(created_at).format('DD-MM-YYYY')}
                        size="m"
                        color="gray"
                        style={styles.textOrder}
                      />
                    </View>
                    <View>
                      {/* <View style={{flexDirection: 'row'}}>
                    <Text
                      children="Tracking number: "
                      style={styles.textOrder}
                      color="gray"
                    />
                    <Text children="IW3475453455" style={styles.textOrder} />
                  </View> */}
                      {/* <View style={{flexDirection: 'row'}}>
                    <Text
                      children="Tracking number: "
                      style={styles.textOrder}
                      color="gray"
                    />
                    <Text children="IW3475453455" style={styles.textOrder} />
                  </View> */}
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          children="Quantity: "
                          style={styles.textOrder}
                          color="gray"
                        />
                        <Text
                          children={order_detail.length}
                          style={styles.textOrder}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          children="Total amount: "
                          style={styles.textOrder}
                          color="gray"
                        />
                        <Text
                          children={`Rp.${total}`}
                          style={styles.textOrder}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text children={status_order} color="green" />
                    </View>
                  </TouchableOpacity>
                );
              },
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
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
  textOrder: {
    marginVertical: 5,
  },
});
