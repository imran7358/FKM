import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const FAQ = ({ navigation }) => {
        return (
        <WebView
        source={{
          uri: 'https://m.freekaamaal.com/faq?api=1',
        }}
        style={{marginTop: 20}}
      />
    );
};
export default FAQ;
