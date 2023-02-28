import React from "react";
import { View, Image} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Preview from "./preview";

const DealsDay = ({navigation, stickyImages}) =>{
    return(
   <View>
    { stickyImages.length ?
     <FlatListSlider
    data={stickyImages}
    component={<Preview imageKey={"image"} />}
    loop={false}
    width={200}
    indicator={false}
    autoscroll ={false}
    onPress={item => {
        if (item.option === 'deal'){
            navigation.navigate({name:'Details',params:{dealSlug:item.slug_url}})
        }
        else {
            navigation.navigate({ name: 'StoreDetails', params: { storeSlug: item.slug_url}})
        }
    }}
  />:null}
   </View>
    )
}


export default DealsDay;
