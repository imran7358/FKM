import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import Home from '../screens/Home';
import Login from '../screens/Login';
import CustomDrawer from './CustomDrawer';
import Authstack from './AuthStack';
import { Dimensions } from 'react-native';


const Humburger = () => {
  return (
    <Drawer.Navigator  drawerContent = {(props) => <CustomDrawer {...props}/>}       initialRouteName="Home" screenOptions={{
      drawerStyle: {
        width: Dimensions.get('window').width / 1.15,
      },
    }}>
     <Drawer.Screen name="Home" component={Authstack} options={{headerShown: false}}/>
     <Drawer.Screen name="Login" component={Login} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
};

export default Humburger;
