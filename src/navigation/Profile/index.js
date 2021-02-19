import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ProfileScreen,
  MyOrdersScreen,
  OrderDetailsScreen,
  SettingsScreen,
  ProductSellerScreen,
  AddProductSellerScreen,
  ShippingAddressScreen,
} from '../../screens';

const Stack = createStackNavigator();

const MainProfile = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialRouteName="MainProfile"
        name="MainProfile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductSeller"
        component={ProductSellerScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductSellerScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="Shipping address"
        component={ShippingAddressScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainProfile;
