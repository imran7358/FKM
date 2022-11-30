import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Store from './TrendingStoreList';

const TrendingStore = () => {
    const images = [
        {
          image:'https://images.freekaamaal.com/store-images/758.jpg',
          desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
        },

        {
          image: 'https://images.freekaamaal.com/store-images/3254.jpg',
          desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
        },
        {
            image: 'https://images.freekaamaal.com/store-images/3758.jpg',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          },
          {
            image: 'https://images.freekaamaal.com/store-images/3763.jpg',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          },

      ];
    return(
    <FlatListSlider
    data={images}
    component={<Store />}
    loop={false}
    width={86}
    indicator={false}
    autoscroll ={false}
    onPress={item => alert(JSON.stringify(item))}
  />
    )

}


export default TrendingStore;
