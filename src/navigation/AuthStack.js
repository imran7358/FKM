import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from '../screens/Home';
import AllStores from '../screens/AllStores';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import ProductCategories from '../screens/ProductCategories';
import CategoryDetails from '../screens/CategoryDetails';
import StoreDetails from '../screens/StoreDetails';
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
import WithdrawlMoney from '../screens/Dashboard/WithdrawalMoney';
import ClaimForm from '../screens/Dashboard/ClaimForm';
import ReferralMoney from '../screens/Dashboard/ReferralMoney';
import MissingCashback from '../screens/Dashboard/MissingCashbackHistory';
import AddAccount from '../screens/Dashboard/AddAccount';
import EditProfile from '../screens/EditProfile';
import UserClaimForm from '../screens/Dashboard/UserClaimForm';
import DealList from '../screens/DealList';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const BottomTabs = ({ navigation }) => {

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  return (
    <Tab.Navigator navigation={navigation} screenOptions={{
      tabBarShowLabel: false,
      headerStyle: {
        backgroundColor: '#f27935',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '900',
      },
    }}>
      <Tab.Screen name="MyHome" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
            <Image source={require('../assets/images/home.png')} style={{
              width: 26,
              height: 26,
              resizeMode: 'contain',
              tintColor: focused ? '#333' : 'black',
            }} />
          </View>

        ),
      }} />
      <Tab.Screen name="Store" component={AllStores} options={{
        BottomTabs: false,
        title: 'All Store',
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
            <Image source={require('../assets/images/store.png')} style={{
              width: 26,
              height: 26,
              resizeMode: 'contain',
              tintColor: focused ? '#333' : 'black',
            }} />
          </View>

        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => { navigation.goBack()}}>
          <View style={styles.backArrow}>
            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
          </View>
        </TouchableOpacity>
        )
      }} />
      <Tab.Screen name="Refer & Earn" component={ReferEarn} options={{
        BottomTabs: false,
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
            <Image source={require('../assets/images/earn.png')} style={{
              width: 26,
              height: 26,
              resizeMode: 'contain',
              tintColor: focused ? '#333' : 'black',
            }} />
          </View>

        ),
      }} />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          BottomTabs: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
              <Image source={require('../assets/images/profileico.png')} style={{
                width: 26,
                height: 26,
                resizeMode: 'contain',
                tintColor: focused ? '#333' : 'black',
              }} />
            </View>

          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AuthStack = ({ navigation }) => {
  return (

    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#f27935',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '900',
      },
    }}>
      <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPaasword" component={ForgotPassword} />
      <Stack.Screen name="Verify" component={EnterOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Stores" component={AllStores} options={{title: 'All Stores',
       cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
       headerLeft: () => (
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <View style={styles.backArrow}>
            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
          </View>
        </TouchableOpacity>
      )
    }} />
      <Stack.Screen name="Categories" component={ProductCategories} initialParams={{ catSlug: "" }} options={{ title: 'Categories' }} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} options={{ title: 'Categories Details' }} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} initialParams={{ storeSlug: "" }} options={{ title: 'Store Details',
     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
     headerLeft: () => (
       <TouchableOpacity onPress={() => { navigation.goBack()}}>
         <View style={styles.backArrow}>
           <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
         </View>
       </TouchableOpacity>
     )
    }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: '' }} />
      <Stack.Screen name="Coupons" component={TopCoupons} options={{ title: '' }} />
      <Stack.Screen name="coupnsDetails" component={CouponsDetails} />
      <Stack.Screen name="Activated" component={CouponsActivated} />
      <Stack.Screen name="Details" component={ProductDetails} initialParams={{ dealSlug: "" }} options={{
        title: 'Deal Details',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerLeft: () => (
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <View style={styles.backArrow}>
              <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
            </View>
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="DealList" component={DealList} options={{ title: 'All Deals' }} />
      <Stack.Screen name="ClickHistory" component={ClickHistory} options={{ title: 'Click History' }} />
      <Stack.Screen name="CashbackHistory" component={CashbackHistory} />
      <Stack.Screen name="WidthdrawalMoney" component={WidthdrawalMoney} />
      <Stack.Screen name="MissingReport" component={MissingReport} />
      <Stack.Screen name="ReferEarn" component={ReferEarn} options={{ title: 'Refer Earn' }} />
      <Stack.Screen name="ReferralHistory" component={ReferalHistory} />
      <Stack.Screen name="WithdrawlMoney" component={WithdrawlMoney} />
      <Stack.Screen name="ClaimForm" component={ClaimForm} />
      <Stack.Screen name="ReferralMoney" component={ReferralMoney} />
      <Stack.Screen name="MissingCashback" component={MissingCashback} />
      <Stack.Screen name="AddAccount" component={AddAccount} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UserClaimForm" component={UserClaimForm} />

    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  active: {
    backgroundColor: '#FFE6D8',
  },
  tabLink: {
    height: 45,
    width: 45,
    borderRadius: 12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
})

export default AuthStack;
