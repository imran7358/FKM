import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';

const MianSlider = () => {
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
    <FlatListSlider 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        onPress={item => alert(JSON.stringify(item))}
        indicatorContainerStyle={{position:'absolute', bottom: 20}}

    />
  );
};

  const styles = StyleSheet.create({
  });


export default MianSlider;
