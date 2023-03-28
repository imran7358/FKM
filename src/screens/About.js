import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const About = ({ navigation }) => {
        return (
        <WebView
        source={{
          uri: 'https://m.freekaamaal.com/about-us?api=1',
        }}
        style={{marginTop: 20}}
      />
    );
};
export default About;
