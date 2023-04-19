import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
const {width} = Dimensions.get('window');


const MianSlider = ({navigation,slideImage}) => {
  return (
    slideImage.length ?
    <FlatListSlider
        horizontal
        showsHorizontalScrollIndicator={false}
        data={slideImage}
        // timer={50000}
        width={width - 30}
        height={210}
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
