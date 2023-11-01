import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Modal, StatusBar} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { User, Menu, LogIn, Search} from 'react-native-feather';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';
import axios from 'axios';
import { debounce } from 'lodash';
const END_URL = '/search/suggestion';

const Header = ({ navigation }) => {
    const [data, setData] = useState({});
    const [noData, setNoData] = useState(false);
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState(false);
  const user = useSelector((state) => {
    return state.user;
  });
  const handleSearchlength = (value) =>
  {
    if (value.length<3){
      setNoData(false);
      setData({});
    }
    else{
      handleChange(value)
      // setNoData(true)
    }
  }
  const handleChange = debounce((value) =>{
    
    setLoading(true);
    axios.post(Config.API_URL + END_URL,{
        apiAuth : Config.API_AUTH,
        'keyword' : value,
    }).then(({data})=>{
      setNoData(false);
      if (value.length<1){
        setNoData(false);
      }
      else if (data.response.suggestion && data.response.suggestion.length){
        setData(data.response.suggestion);
      }
      else {
        setNoData(true);
        setData({});
      }
    }).catch((error)=>{
        console.log(error);
    }).finally(()=>{
      setLoading(false);
    });
}, 300);

const handleSubmit = (value) => {
    setSearch(false);
       navigation.navigate({ name: 'search', params: { searchKeyword:value } })
}
useEffect(()=>{
},[data, noData,search]);


  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#f27935" />
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
        <TouchableOpacity onPress={()=> setSearch(!search)}>
        <View style={styles.serchCon} >
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
        </View>
        </TouchableOpacity>
        {
            search ?
            <Modal>
                <View style={styles.serachCon}>
                    <View style={styles.searchAreaCon}>
                       <TouchableOpacity onPress={()=> setSearch(!search)}>
                       <View style={styles.backButton}>
                           <Image source={require('../assets/images/back.png')} style={styles.backImg}/>
                        </View>
                       </TouchableOpacity>
                        <View style={styles.searchInput}>
                            <TextInput placeholder="Search your Cashback Store" style={styles.searchBox} placeholderTextColor="#fff"
                            onChangeText={(txt) => handleSearchlength(txt)} 
                            autoComplete="off"
                            autoCapitalize="none"
                            returnKeyType="search"
                            onSubmitEditing={(txt)=> handleSubmit(txt.nativeEvent.text)}
                            // onPress={()=> navigation.navigate("search")} returnKeyType="search"
                            />
                        </View>
                    </View>

                    <View style={styles.suggestionCon}>
                      {/* <Text style={styles.suggestHeading}>Top Suggestions</Text> */}
                      <View>
                      {
                      data.length && data.map((item,i)=> { return <TouchableOpacity key={i} onPress = {()=>{setSearch(false), navigation.navigate({name: 'StoreDetails', params: { storeSlug: item.name} })}}>
                        <View style={styles.searchList}>
                        <Search width={18} height={18} style={styles.filterIcon}/>
                        {
                          item.rate_type=='1' ?
                          <>
                          <Text style={styles.productName}>{item.name}</Text>
                          <Text style={styles.cashbackamt}> {item.amount}% cashback</Text>
                          </>
                          :
                          <>
                          <Text style={styles.productName}>{item.name
                          }</Text>
                          <Text style={styles.cashbackamt}> Rs.{item.amount} cashback</Text>
                          </>
                        }
                          

                          </View>
                      </TouchableOpacity>
                      })
                    }
                    {
                      noData ? <View style={styles.NoData}><Text>Oops !! No Store Found</Text></View> : null
                    }
                    </View>
                    </View>
                </View>
                {/* {
                    data.length && data.map((item,i)=>{
                        return <View>
                        <Text>Data</Text>
                    </View>
                    })
                } */}
            </Modal>
            : null
        }

       {
        user.userToken ? <View>
         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
         <User style={{ color: '#fff', width: 100}} width={22} height={22} />
       </TouchableOpacity>
        </View> :
         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
         <LogIn style={{ color: '#fff', width: 100}} width={22} height={22} />
       </TouchableOpacity>
       }


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
  NoData: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  searchList:{
    flexDirection: 'row',
    marginTop:10,
    alignItems: 'center',

  },
  filterIcon: {
    width: 18,
    height: 18,
    color: '#333',
    marginRight: 7,
  },
  productName : {
    fontSize:16,
  },
  cashbackamt : {
    fontSize:16,
    color:'green',
    fontWeight:'bold',
  },
  suggestHeading:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'#f27935'
  },
  suggestionCon: {
padding: 20,
  },
  innerSuggestion: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    borderRadius:6,
  },
  serachCon:{
  position: 'relative',
  backgroundColor: '#fff',
  flex: 1,
  },
  searchAreaCon:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f27935',
    padding: 20,
    height: 130,
    paddingTop: 50,
  },
    searchBox:{
    borderWidth:1,
    borderColor: '#fff',
    borderRadius:6,
    width: '100%',
    padding: 13,
    color:'#fff',
    },
    backButton:{
        width:'10%',
    },
    searchInput: {
        width:'83%',
    },
    backImg: {
        width:25,
        resizeMode: 'contain',
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
  popContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: '100%',
    zIndex: 999,
    width: '100%',
    left: 0,
  },
});
export default Header;
