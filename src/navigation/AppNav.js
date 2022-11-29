import React from 'react';
//import AuthStack from '../navigation/AuthStack';
import Humburger from './humburger';
import {NavigationContainer} from '@react-navigation/native';

const AppNav = ({navigation}) => {
  return (

      // <AuthStack navigation= {navigation} />
      <NavigationContainer>
        <Humburger />
      </NavigationContainer>
  );
};

export default AppNav;

