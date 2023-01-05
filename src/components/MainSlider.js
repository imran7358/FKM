import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Config from 'react-native-config';
const END_URL = "/home/home";
import axios from 'axios';

const MianSlider = ({navigation,slideImage}) => {
  
  const images = [
    {
      image: 'https://images.freekaamaal.com/home-slider/site/mobile_black-friday-sale-banner-2-(24-nov)-mobilejpg.webp'
    },
    {
      image: 'https://images.freekaamaal.com/home-slider/site/mobile_croma-branding-banner-(18-nov)-mobile_(2)jpg.webp',
      desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },

    {
        image: 'https://images.freekaamaal.com/home-slider/site/mobile_the-sleep-company-live-again-(25-nov)-mobilejpg.webp',
        desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
      },
  ];

  return (
    slideImage.length?
    <FlatListSlider
        horizontal
        showsHorizontalScrollIndicator={false}
        data={slideImage}
        imageKey={'app_slider_image'}
        onPress={item => {
          navigation.navigate({name:'Details',params:{dealSlug:slideImage[item].app_landing_url}})}
        }
        indicatorContainerStyle={ { position : 'absolute' , bottom: 20 } } /> : null
    
  );
};

  const styles = StyleSheet.create({
  });


export default MianSlider;
