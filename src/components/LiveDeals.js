import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Live from "./livePrivew";

const LiveDeals = () =>{
    const images = [
        {
          image:'https://images.freekaamaal.com//featured_images/medium_186298_bluechip.jpg',
          desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          price: '500',
          offer: '600',
          viewer: '48'
        },
        {
          image: 'https://images.freekaamaal.com//featured_images/medium_186367_Combo(6).png',
          desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          price: '500',
          offer: '600',
          viewer: '50',
        },
        {
            image: 'https://images.freekaamaal.com//featured_images/medium_185995_3.jpg',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
            price: '500',
            offer: '600',
            viewer: '60'
          },
          {
            image: 'https://images.freekaamaal.com//featured_images/medium_186365_dfbjfa(14).png',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
            price: '500',
            offer: '600',
            viewer: '80'
          },

      ];
    return(
    <FlatListSlider
    data={images}
    component={<Live />}
    loop={false}
    width={200}
    indicator={false}
    autoscroll ={false}
    onPress={item => alert(JSON.stringify(item))}
  />
    )

}


export default LiveDeals;