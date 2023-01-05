import React from "react";
import { View, Image} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Preview from "./preview";

const DealsDay = ({navigation, stickyImages}) =>{

    const images = [
        {
          image:'https://images.freekaamaal.com/sticky/root-natural-dhamaka-sale-(25-nov)_(1)jpg.webp',
          desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
        {
          image: 'https://images.freekaamaal.com/sticky/zigly-increased-cashback-on-pet-foods-(24-nov)jpg.webp',
          desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
        },
        {
            image: 'https://images.freekaamaal.com/sticky/nature-4-nature-fall-hair-oil-(25-nov)jpg.webp',
            desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
          },
          {
            image: 'https://images.freekaamaal.com/sticky/fitspire-whey-protein-(25-nov)jpg.webp',
            desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
          },
      ];
  
    return(
   <View>
    { stickyImages.length?
     <FlatListSlider
    data={stickyImages}
    component={<Preview imageKey={"image"} />}

    loop={false}
    width={200}
    indicator={false}
    autoscroll ={false}
    onPress={item => {console.log("YE ===>>>",item);navigation.navigate({name:'Details',params:{dealSlug:item.link}})}}
  />:null}
   </View>
    )
}


export default DealsDay