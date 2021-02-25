import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconn from 'react-native-vector-icons/Octicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../utils';
import {TouchableOpacity, View} from 'react-native';
import Iconnn from 'react-native-vector-icons/EvilIcons';

// redux
import {useSelector} from 'react-redux';

import {SocketProvider} from '../utils/Context/index';

import {
  HomeScreen,
  BagScreen,
  FavoriteScreen,
  ShopScreen,
  ProfileScreen,
  MyOrdersScreen,
  OrderDetailsScreen,
  SettingsScreen,
  ShippingAddressScreen,
  AddingShippingAddressScreen,
  DetailProductScreen,
  NotificationScreen,
  LoginScreen,
  LoginForgot,
  FilterScreen,
  RegisterScreen,
  ResetPasswordScreen,
  SearchScreen,
  ForgotPasswordScreen,
  ListScreen,
  CheckOutScreen,
  CatalogeScreen,
  MainCatalogScreen,
  SplashScreen,
  SuccessScreen,
  ProductSellerScreen,
  UpdateAddressScreen,
  ChatScreen,
  RatingAndReview,
} from '../screens';

import MainProfile from './Profile';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainScreenView = () => {
  const level = useSelector((state) => state.authReducer.level);
  return (
    <BottomTab.Navigator
      // initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Shop') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Bag') {
            iconName = focused ? 'shopping' : 'shopping';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: colors.white,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          elevation: 8,
        },
        activeTintColor: colors.red,
        inactiveTintColor: colors.gray,
      }}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Shop" component={ShopScreen} />
      {level === 1 && <BottomTab.Screen name="Bag" component={BagScreen} />}
      {/* {level === 1 && (
        <BottomTab.Screen name="Favorites" component={FavoriteScreen} />
      )} */}
      <BottomTab.Screen name="Profile" component={MainProfileScreen} />
    </BottomTab.Navigator>
  );
};

const MainProfileScreen = () => {
  return <MainProfile />;
};

const StackScreen = ({navigation}) => {
  const user_id = useSelector((state) => state.authReducer.user_id);
  return (
    <SocketProvider id={user_id}>
      <Stack.Navigator>
        <Stack.Screen
          initialRouteName="Splash"
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainScreenView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ReviewRating" component={RatingAndReview} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Forgot"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Otp"
          component={LoginForgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reset"
          component={ResetPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cataloge"
          component={CatalogeScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => navigation.navigate('Search')}>
                <Iconnn name="search" color={colors.black} size={30} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Catalog" component={MainCatalogScreen} />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckOut"
          component={CheckOutScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="DetailProduct"
          component={DetailProductScreen}
          options={({route}) => ({
            title: route.params.categories,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: 'Notification',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Adding Shipping Address"
          component={AddingShippingAddressScreen}
          options={{
            title: 'Adding Shipping Address',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update Shipping Address"
          component={UpdateAddressScreen}
          options={{
            title: 'Update Shipping Address',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Shipping address"
          component={ShippingAddressScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SocketProvider>
  );
};

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};
