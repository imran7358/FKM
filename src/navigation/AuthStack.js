import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from '../screens/Home';
import AllStores from '../screens/AllStores';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();
const BottomTabs = ({navigation}) => {
  return (
    <Tab.Navigator navigation={navigation}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Store" component={AllStores} options = {{BottomTabs: false}}/>
      <Tab.Screen name="Refer & Earn" component={AllStores} />
      <Tab.Screen name="Profile" component={AllStores} />
    </Tab.Navigator>
  );
};
const AuthStack = ({navigation}) => {
  return (

      <Stack.Navigator>
      <Stack.Screen name="My Home" component={BottomTabs} options ={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} navigationO/>
    </Stack.Navigator>
  );
};

export default AuthStack;
