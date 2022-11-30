import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

export default (Store = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
   
    <TouchableOpacity
      style={[styles.videoContainer]}
      onPress={() => onPress(item)}>
         <View style={style.liveDealsCon}>
      <View style={[styles.imageContainer, styles.shadow]}>
        <Image
          style={styles.videoPreview}
          source={{uri: item[imageKey]}}
        />
      </View>
      </View>
    </TouchableOpacity>
   
  );
});




const styles = StyleSheet.create({
  videoContainer: {
    width: 100,
    paddingVertical: 0,
    marginRight: 15,
    borderRadius: 6,
    marginTop: 20,
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPreview: {
    width: 72,
    height: 30,
    borderRadius: 8,
    resizeMode: 'contain',
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
    width: 15,
    height: 15,
    resizeMode: 'contain'
},
priceTxt: {
    fontSize: 19,
    fontWeight: 'bold',
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
    width: 80,
    height: 30,
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
fontWeight: '900',
color: '#fff',
},
view: {
    fontWeight: '500',
}
});