import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const Policy = ({ navigation }) => {
        return (
        <WebView
        source={{
          uri: 'https://freekaamaal.com/privacy-policy.html',
        }}
        
      />
    );
};
export default Policy;
