import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Store from './TrendingStoreList';

const TrendingStore = ({navigation,featuredStore}) => {
    return(
      featuredStore.length ?
    <FlatListSlider
    data={featuredStore}
    imageKey={'store_image'}
    component={<Store/>}
    loop={false}
    width={86}
    indicator={false}
    autoscroll ={false}
    onPress={item =>
      {
        navigation.navigate({name: 'StoreDetails',params:{storeSlug:item.store_slug}})}}
  />
  : null
    )

}


export default TrendingStore;
