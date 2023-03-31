import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Grid,ShoppingBag,Home as HomeIcon,Users,User, Percent, PhoneCall, HelpCircle, LogOut, Tag} from "react-native-feather";
import Home from '../screens/Home';
import AllStores from '../screens/AllStores';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import ProductCategories from '../screens/ProductCategories';
import CategoryDetails from '../screens/CategoryDetails';
import StoreDetails from '../screens/StoreDetails';
import ForgotPassword from '../screens/ForgotPassword';
import EnterOTP from '../screens/EnterOTP';
import PhoneVerification from '../screens/PhoneVerificationOTP';
import EmailVerification from '../screens/EmailVerificationOtp';
import ResetPassword from '../screens/ResetPassword';
import TopCoupons from '../screens/Coupons';
import CouponsDetails from '../screens/CouponsDetail';
import CouponsActivated from '../screens/CouponActivated';
import ProductDetails from '../screens/ProductDetials';
import ReferEarn from '../screens/ReferEarn';
import Profile from '../screens/Dashboard';
import ClickHistory from '../screens/Dashboard/ClickHistory';
import CashbackHistory from '../screens/Dashboard//CbHistory';
import WidthdrawalHistory from '../screens/Dashboard/WithdrawlHistory';
import MissingReport from '../screens/Dashboard/ReportMissing';
import Register from '../screens/Register';
import ReferalHistory from '../screens/Dashboard/ReferalHistory';
import ClaimForm from '../screens/Dashboard/ClaimForm';
import ReferralMoney from '../screens/Dashboard/ReferralMoney';
import MissingCashback from '../screens/Dashboard/MissingCashbackHistory';
import AddAccount from '../screens/Dashboard/AddAccount';
import EditProfile from '../screens/EditProfile';
import UserClaimForm from '../screens/Dashboard/UserClaimForm';
import DealList from '../screens/DealList';
// WithdrawMoney
import WidthdarawlMoney from '../screens/Dashboard/WithdrawlMoney';
import WidthdarawlForm from '../screens/Dashboard/WithdrawlMoney/WithdrawaForm';
import MissingForm from '../screens/Dashboard/MissingForm';
import MissingCashBackForm from '../screens/Dashboard/MissingForm/MissingCashback';
import SearchProduct from '../screens/SearchProducts';
import Search from '../screens/Search'
import AllCashback from '../screens/Cashback';
import AllDeals from '../screens/Cashback/AllCashbackDeals';
import AllCashbackStores from '../screens/Cashback/AllCashbackStore';
import About from '../screens/About';
import FAQ from '../screens/FAQ';
import { useIsFocused } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
// WithdrawMoney
import { View, Image, StyleSheet, RefreshControl} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//WithDrawRefferal
import WithdrawRefferal from '../screens/Dashboard/WithdrawRefferal';
import ChangePassword from '../screens/Dashboard/ChangePassword';
import { useSelector } from 'react-redux';
import { useEffect, useState, useCallback} from 'react';
import {ShoppingCart} from "react-native-feather";


//WithDrawRefferal

const Tab = createBottomTabNavigator();


const BottomTabs = ({ navigation }) => {
    const isFocused = useIsFocused();
    const startReload = ()=> RNRestart.Restart();

    const userToken = useSelector(state => state.user.userToken);
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
    const [refresh, setReferesh] = useState(false)
    const onRefresh =() => {
        console.log("Tets")
        setReferesh(true);
        setTimeout(() => {
            setReferesh(false);
        }, 2000);
    }
    useEffect(()=>{
    },[userToken])

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
            <Tab.Screen name="Root" component={Home} options={{
                unmountOnBlur: true,
                headerShown: false,
                tabBarScrollEnabled: true,
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
                        <HomeIcon style={{
                            width: 26,
                            height: 26,
                            color:'black',
                            resizeMode: 'contain',
                            tintColor: focused ? '#333' : 'black',
                        }} />
                    </View>

                ),
            }} 
            listeners={{
                tabPress: e => {
                    startReload()
                },
            }}
            />
            <Tab.Screen name="Store" component={AllStores} options={{
                BottomTabs: false,
                title: 'All Store',
                tabBarIcon: ({ focused }) => (
                    <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
                        <ShoppingBag style={{
                            width: 26,
                            height: 26,
                            resizeMode: 'contain',
                            color:'black',
                            tintColor: focused ? '#333' : 'black',
                        }} />
                    </View>

                ),
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            {
                userToken ? <Tab.Screen name="Refer & Earn" component={ReferEarn}
                options={{

                    BottomTabs: false,
                    title: 'Refer & Earn',

                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
                            <Users  style={{
                                width: 26,
                                height: 26,
                                resizeMode: 'contain',
                                color:'black',
                                tintColor: focused ? '#333' : 'black',
                            }} />
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={styles.backArrow}>
                                <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                            </View>
                        </TouchableOpacity>
                    )
                }} /> : <Tab.Screen name="Login1" component={Login}
                options={{
                    BottomTabs: false,
                    title: 'Login',
                    tabBarStyle: {display: 'none'},
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
                            <Users style={{
                                width: 26,
                                height: 26,
                                resizeMode: 'contain',
                                color:'black',
                                tintColor: focused ? '#333' : 'black',
                            }} />
                        </View>

                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={styles.backArrow}>
                                <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            /> 
            }

                    {
                        userToken ?  <Tab.Screen name="Profile" component={Profile}
                        options={{
                            BottomTabs: false,
                            tabBarIcon: ({ focused }) => (
                                <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
                                    <User style={{
                                        width: 26,
                                        height: 26,
                                        color:'black',
                                        resizeMode: 'contain',
                                        tintColor: focused ? '#333' : 'black',
                                    }} />
                                </View>
        
                            ),
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                    <View style={styles.backArrow}>
                                        <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    /> : <Tab.Screen name="Login" component={Login}
                    options={{
                        BottomTabs: false,
                        tabBarStyle: {display: 'none'},
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.tabLink, focused ? styles.active : styles.tabLink]}>
                                <User style={{
                                    width: 26,
                                    height: 26,
                                    color:'black',
                                    resizeMode: 'contain',
                                    tintColor: focused ? '#333' : 'black',
                                }} />
                            </View>
    
                        ),
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <View style={styles.backArrow}>
                                    <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                /> 
                    }

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
        }} initialRouteName={Home}>
            <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false, title: '' }} />
            <Stack.Screen name="Login" component={Login} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                BottomTabs: false,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="Register" component={Register} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

<Stack.Screen name="CashbackDeals" component={AllDeals} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

<Stack.Screen name="AllCashbackStores" component={AllCashbackStores} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            

<Stack.Screen name="Cashback" component={AllCashback} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />


<Stack.Screen name="AboutUs" component={About} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="FAQ" component={FAQ} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />


<Stack.Screen name="search" component={Search} initialParams={{ searchKeyword: "" }} options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                title: 'Search Product',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="ForgotPaasword" component={ForgotPassword} options={{
                title: 'Forgot Password',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
                title: 'Change Password',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            <Stack.Screen name="Verify" component={EnterOTP} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Stores" component={AllStores} options={{
                title: 'All Stores',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            
            <Stack.Screen name="PhoneVerification" component={PhoneVerification} options={{
                title: 'Phone Verification',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            
            
            <Stack.Screen name="EmailVerification" component={EmailVerification} options={{
                title: 'EmailVerification',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            
            
            <Stack.Screen name="Categories" component={ProductCategories} initialParams={{ catSlug: "" }} options={{
                title: 'Categories',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="CategoryDetails" component={CategoryDetails} options={{
                title: 'Categories Details',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            <Stack.Screen name="MissingForm" component={MissingForm} options={{
                title: 'Missing Form',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            <Stack.Screen name="MissingCashBackForm" component={MissingCashBackForm} options={{
                title: 'Missing Cashback Form',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            <Stack.Screen name="StoreDetails" component={StoreDetails} initialParams={{ storeSlug: "" }} options={{
                title: 'Store Details',

                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{
                title: 'Profile',
                BottomTabs: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )

            }} />
            <Stack.Screen name="Coupons" component={TopCoupons} options={{
                title: 'Coupons',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )

            }} />
            <Stack.Screen name="coupnsDetails" component={CouponsDetails} options={{
                title: 'Coupons Details',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
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
            <Stack.Screen name="DealList" component={DealList} options={{
                title: 'All Deals',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="ClickHistory" component={ClickHistory} options={{
                title: 'Click History',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="CashbackHistory" component={CashbackHistory} options={{

                title: 'Cashback History',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="WidthdrawalMoney" component={WidthdarawlMoney} options={{
                title: 'Withdarawl Money',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            <Stack.Screen name="WidthdarawlForm" component={WidthdarawlForm} options={{
                title: 'Withdarawl Money',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

            <Stack.Screen name="MissingReport" component={MissingReport}
                options={{
                    title: 'Missing Report',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={styles.backArrow}>
                                <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="ReferEarn" component={ReferEarn} options={{
                title: 'Refer Earnn',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="ReferralHistory" component={ReferalHistory} options={{

                title: 'Referral History',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )

            }} />

            <Stack.Screen name="WithdrawalHistory" component={WidthdrawalHistory} options={{

                title: 'Withdarawl History',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )

            }} />
            <Stack.Screen name="ClaimForm" component={ClaimForm}
                options={{
                    title: 'Claim Form',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={styles.backArrow}>
                                <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                            </View>
                        </TouchableOpacity>
                    )
                }} />
            <Stack.Screen name="ReferralMoney" component={WithdrawRefferal} options={{
                title: 'Referral Money',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="MissingCashback" component={MissingCashback} options={{
                title: 'Missing Cashback',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="AddAccount" component={AddAccount} options={{
                title: 'Add Account',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="EditProfile" component={EditProfile}
                options={{
                    title: 'Edit Profile',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={styles.backArrow}>
                                <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="UserClaimForm" component={UserClaimForm} options={{

                title: 'User Claim Form',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={styles.backArrow}>
                            <Image source={require('../assets/images/backArrow.png')} style={styles.backIcon} />
                        </View>
                    </TouchableOpacity>
                )
            }} />

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
