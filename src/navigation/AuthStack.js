import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from '../screens/Home';
import AllStores from '../screens/AllStores';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import ProductCategories from '../screens/ProductCategories';
import CategoryDetails from '../screens/CategoryDetails';
import StoreDetails from '../screens/StoreDetails';
import Profile from '../screens/Profile';
import ForgotPassword from '../screens/ForgotPassword';
import EnterOTP from '../screens/EnterOTP';
import ResetPassword from '../screens/ResetPassword';
import TopCoupons from '../screens/Coupons';
import CouponsDetails from '../screens/CouponsDetail';
import CouponsActivated from '../screens/CouponActivated';
import ProductDetails from '../screens/ProductDetials';

const Tab = createBottomTabNavigator();
const BottomTabs = ({navigation}) => {
  return (
    <Tab.Navigator navigation={navigation}>
      <Tab.Screen name="My Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Store" component={AllStores} options={{BottomTabs: false}}/>
      <Tab.Screen name="Refer & Earn" component={AllStores} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
const AuthStack = ({navigation}) => {
  return (

      <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomTabs} options ={{headerShown: false, title: ''}}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot Paasword" component={ForgotPassword} />
      <Stack.Screen name="Enter OTP" component={EnterOTP} />
      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="Stores" component={AllStores} />
      <Stack.Screen name="Categories" component={ProductCategories} options={{title: ''}}/>
      <Stack.Screen name="Category Details" component={CategoryDetails} options={{title: ''}}/>
      <Stack.Screen name="Store Details" component={StoreDetails} options={{title: ''}}/>
      <Stack.Screen name="Profile" component={Profile} options={{title: ''}} />
      <Stack.Screen name="Coupons" component={TopCoupons} options={{title: ''}} />
      <Stack.Screen name="coupnsDetails" component={CouponsDetails} />
      <Stack.Screen name="Activated" component={CouponsActivated} />
      <Stack.Screen name="Details" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default AuthStack;
