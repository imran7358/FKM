import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Live from "./livePrivew";

const LiveDeals = ({navigation, livedeals}) =>{
    return(
      livedeals.length ? 
      <FlatListSlider
    data={livedeals}
    component={<Live navigation = {navigation} />}
    imageKey={"img_hp_url"}
    loop={false}
    width={200}
    indicator={false}
    autoscroll ={false}
    onPress={(item) => {navigation.navigate({name:'Details',params:{dealSlug:item.slug_url}})}
    }
  />
  : null
    )
}
export default LiveDeals;