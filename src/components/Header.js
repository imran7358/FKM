import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User, Menu, LogIn} from 'react-native-feather';
import { useSelector } from 'react-redux';

const Header = ({ navigation }) => {
  const userToken = useSelector(state => {
    return state.user.userToken;
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <View style={styles.menBox} >
          <Text>
            <Menu style={{ color: '#fff' }} width={20} height={20} />
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.logoCon}>
        <Image source={require('../assets/images/logo.png')} style={styles.fkmLogo} />
      </View>
      <View style={styles.searchArea}>
        <View style={styles.serchCon}>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
        </View>
       {
        userToken ? <View>
         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
         <User style={{ color: '#fff', width: 100,}} width={22} height={22} />
       </TouchableOpacity>
        </View> :
         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
         <LogIn style={{ color: '#fff', width: 100,}} width={22} height={22} />
       </TouchableOpacity>
       }

         {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
         <User style={{ color: '#fff', width: 100,}} width={22} height={22} />
       </TouchableOpacity> */}

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f27935',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
  },
  menBox: {
    marginTop: 4,
  },
  MenuImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  fkmLogo: {
    width: 200,
    height: 30,
    resizeMode: 'contain',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifaction: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  serchCon: {
    marginRight: 15,
    width: 20,
    height: 20,
  },
});
export default Header;
