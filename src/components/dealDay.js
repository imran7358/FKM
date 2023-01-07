import React from "react";
import { View, Image} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Preview from "./preview";

const DealsDay = ({navigation, stickyImages}) =>{

  
  
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
    onPress={item => {navigation.navigate({name:'Details',params:{dealSlug:item.link}})}}
  />:null}
   </View>
    )
}


export default DealsDay;
