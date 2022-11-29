import React from "react";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Grid,ShoppingBag, Percent, Scissors, Briefcase, BookOpen, PhoneCall, HelpCircle, LogOut} from "react-native-feather";
  

const CustomDrawer = ({navigation}) => {
   
    return (

        <View style={{}}>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <View style={{backgroundColor: '#f27935', height: 120,}}>
            </View>
            </TouchableOpacity>
            <View style={styles.humburgerContainer}>
                <View style={styles.editProfile}>
                    <Text style={styles.edtiTxt}>Edit</Text>
                </View>
              <View style={styles.profileInfo}>
                <View style={styles.profileimage}>
                   <View style={styles.profileImg}>
                    
                   </View>
                </View>
                <View style={styles.profileName}>
                    <Text>Hi,</Text>
                    <Text style={styles.pName}>Mohammad Imran</Text>
                </View>
              </View>
            </View>
            <View style={styles.humburgerMenu}>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                    <Grid style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Dashboard</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <ShoppingBag style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Store</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Grid style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Category</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Percent style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Coupons</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Scissors style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Festivals</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Briefcase style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>100% Cashback</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <BookOpen style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Hindi Articles</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Briefcase style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Career</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <PhoneCall style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Conatc Us</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <HelpCircle style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Help & Support</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <LogOut style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text>Logout</Text>
                </View>
               </View>
               
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    humburgerContainer: {
        padding: 20,
        paddingBottom: 0,
    },
    profileInfo: {
        backgroundColor: '#FAFAFA',
        borderRadius: 9,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',

    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 15,
    },
    editProfile: {
        position: 'absolute', 
        right:35,
        top: 35,
        zIndex: 999,
        backgroundColor: '#f27935',
        borderRadius: 45,
        padding: 8,
        width:60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    edtiTxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    pName: {
        fontSize: 18,
        fontWeight: '900'
    },
    humburgerMenu: {
       paddingLeft: 20,
       paddingRight: 20,
    },
    menuListCon: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: 'rgba(204, 204, 204, 0.3)',
        borderBottomWidth: 1,
    },
    menuName: {
        fontSize: 20,
        fontWeight: '500',
    },
    menuTxt : {
        fontSize: 16,
        fontWeight: '400',
    },
    iconSize: {
        color: '#333',
        marginRight: 10,

    }

})

export default CustomDrawer;
