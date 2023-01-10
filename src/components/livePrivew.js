import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

export default (Live = ({
  style,
  item,
  imageKey,
  onPress,
}) => {
  return (
   
    <TouchableOpacity
    onPress={()=>{onPress(item)}}
      style={[styles.videoContainer]} >
         <View style={style.liveDealsCon} >
      <View style={[styles.imageContainer, styles.shadow]}>
       <View style={styles.liveViewer}>
        <Text style={styles.viewTxt}>{item.views}</Text>
       </View>
        <Image
          style={styles.videoPreview}
          source={{uri: item[imageKey]}}
        />
      </View>
      <View style={styles.dealDiscription}>
      <Text style={styles.desc} numberOfLines={3}>{item.title}</Text>
      <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>{item.offer_price}</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>{item.price}</Text>
                        </View>
                    </View>
      </View>
      </View>
    </TouchableOpacity>
   
  );
});

const styles = StyleSheet.create({
  videoContainer: {
    width: 160,
    paddingVertical: 0,
    marginRight: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    marginTop: 20,
  },
  videoPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 11,
    letterSpacing: 0,
    lineHeight: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 130,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    position: 'relative',
  },
  liveDealsCon: {
    backgroundColor: 'red',
  },
  dealDiscription: {
   padding: 10,
   paddingLeft: 15,
   paddingRight: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 8,
},
innerPrice: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
},
rpImage: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
},
priceTxt: {
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 3,
},
cutprice: {
    color: '#888888',
},
cutLine: {
    position: 'absolute',
    width: '100%',
    height:2,
    backgroundColor: '#f27935',

},
liveViewer: {
    position: 'absolute',
    width: 65,
    height: 25,
    backgroundColor: '#F27935',
    borderRadius: 3,
    zIndex: 999,
    top: 20,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.85,
},
viewTxt: {
fontWeight: '500',
color: '#fff',
fontSize:10,
},
view: {
    fontWeight: '500',
}
});