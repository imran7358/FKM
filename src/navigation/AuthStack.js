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
//import Profile from '../screens/Profile';
import ForgotPassword from '../screens/ForgotPassword';
import EnterOTP from '../screens/EnterOTP';
import ResetPassword from '../screens/ResetPassword';
import TopCoupons from '../screens/Coupons';
import CouponsDetails from '../screens/CouponsDetail';
import CouponsActivated from '../screens/CouponActivated';
import ProductDetails from '../screens/ProductDetials';
import AllDeals from '../components/AllDeals';
import ReferEarn from '../screens/ReferEarn';
import Profile from '../screens/Dashboard';
import ClickHistory from '../screens/Dashboard/ClickHistory';
import CashbackHistory from '../screens/Dashboard//CbHistory';
import WidthdrawalMoney from '../screens/Dashboard/WithdrawlHistory';
import MissingReport from '../screens/Dashboard/ReportMissing';
import Register from '../screens/Register';
import ReferalHistory from '../screens/Dashboard/ReferalHistory';
import WithdrawlMoney from '../screens/Dashboard/WidthdrawMoney';
import ClaimForm from '../screens/Dashboard/ClaimForm';
import ReferralMoney from '../screens/Dashboard/ReferralMoney';
import MissingCashback from '../screens/Dashboard/MissingCashback';
import AddAccount from '../screens/Dashboard/AddAccount';
import { View, Image, Text, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
const BottomTabs = ({navigation}) => {
  return (
    <Tab.Navigator navigation={navigation} screenOptions ={{
      tabBarShowLabel: false,
      headerStyle: {
        backgroundColor: '#f27935',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Tab.Screen name="MyHome" component={Home} options={{headerShown: false,
      tabBarIcon:({focused})=>(
        <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
          <Image source = {require('../assets/images/home.png')} style={{
            width: 26,
            height:26,
            resizeMode: 'contain',
            tintColor: focused ? '#333' : 'black',
          }}/>
        </View>
       
      ),
      }} />
      <Tab.Screen name="Store" component={AllStores} options={{BottomTabs: false,
        tabBarIcon:({focused})=>(
          <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
            <Image source = {require('../assets/images/store.png')} style={{
              width: 26,
              height:26,
              resizeMode: 'contain',
              tintColor: focused ? '#333' : 'black',
            }}/>
          </View>
         
        ),
      }}/>
      <Tab.Screen name="Refer & Earn" component={ReferEarn} options={{BottomTabs: false,
        tabBarIcon:({focused})=>(
          <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
            <Image source = {require('../assets/images/earn.png')} style={{
              width: 26,
              height:26,
              resizeMode: 'contain',
              tintColor: focused ? '#333' : 'black',
            }}/>
          </View>
         
        ),
      }}/>
      <Tab.Screen name="Profile" component={Profile} 
      options={{BottomTabs: false,
        tabBarIcon:({focused})=>(
          <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
            <Image source = {require('../assets/images/profileico.png')} style={{
              width: 26,
              height:26,
              resizeMode: 'contain',
              tintColor: focused ? '#333' : 'black',
            }}/>
          </View>
         
        ),
      }}
      />
    </Tab.Navigator>
  );
};
const AuthStack = ({navigation}) => {
  return (

      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#f27935',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Home" component={BottomTabs} options ={{headerShown: false, title: ''}}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot Paasword" component={ForgotPassword} />
      <Stack.Screen name="Verify" component={EnterOTP} />
      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="Stores" component={AllStores} screenOptions={{}}/>
      <Stack.Screen name="Categories" component={ProductCategories} initialParams={{ catSlug: "" }} options={{title: ''}}/>
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} options={{title: ''}}/>
      <Stack.Screen name="StoreDetails" component={StoreDetails} initialParams={{ storeSlug: "" }} options={{title: ''}}/>
      <Stack.Screen name="Profile" component={Profile} options={{title: ''}} />
      <Stack.Screen name="Coupons" component={TopCoupons} options={{title: ''}} />
      <Stack.Screen name="coupnsDetails" component={CouponsDetails}/>
      <Stack.Screen name="Activated" component={CouponsActivated} />
      <Stack.Screen name="Details" component={ProductDetails} initialParams={{ dealSlug: "" }}/>
      <Stack.Screen name="Deal List" component={AllDeals} />
      <Stack.Screen name="Click History" component={ClickHistory} />
      <Stack.Screen name="Cashback History" component={CashbackHistory} />
      <Stack.Screen name="Widthdrawal Money" component={WidthdrawalMoney} />
      <Stack.Screen name="Missing Report" component={MissingReport} />
      <Stack.Screen name="Refer Earn" component={ReferEarn} />
      <Stack.Screen name="Referral History" component={ReferalHistory} />
      <Stack.Screen name="Withdrawl Money" component={WithdrawlMoney} />
      <Stack.Screen name="Claim Form" component={ClaimForm} />
      <Stack.Screen name="Referral Money" component={ReferralMoney} />
      <Stack.Screen name="Missing Cashback" component={MissingCashback} />
      <Stack.Screen name="Add Account" component={AddAccount} />

    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  active:{
   backgroundColor: '#FFE6D8'
  },
  tabLink: {
    height: 45,
    width: 45,
    borderRadius: 12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  }
})

export default AuthStack;
