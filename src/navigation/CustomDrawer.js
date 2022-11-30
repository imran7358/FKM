import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { Grid,ShoppingBag, Percent, Scissors, Briefcase, BookOpen, PhoneCall, HelpCircle, LogOut} from "react-native-feather";

const CustomDrawer = ({navigation}) => {
    return (

        <View style={{}}>
            <TouchableOpacity onPress={(props)=> navigation.navigate('Login')}>
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
                    <Image source={require('../assets/images/profile-icon.png')} style={styles.imgProfile}/>
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
               <TouchableOpacity onPress={()=> navigation.navigate('Stores')}>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <ShoppingBag style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Stores</Text>
                </View>
               </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=> navigation.navigate('Categories')}>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Grid style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Categories</Text>
                </View>
               </View>
               </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigation.navigate('Coupons')}>
              <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Percent style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                <Text style={styles.menuTxt}>Coupons</Text>
                </View>
               </View>
              </TouchableOpacity>


            
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Scissors style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Festivals</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Briefcase style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>100% Cashback</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <BookOpen style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Hindi Articles</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <Briefcase style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Career</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <PhoneCall style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Conatc Us</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <HelpCircle style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Help & Support</Text>
                </View>
               </View>
               <View style={styles.menuListCon}>
                <View style={styles.menuIcon}>
                <LogOut style={styles.iconSize} width={18}/>
                </View>
                <View style={styles.menuName}>
                    <Text style={styles.menuTxt}>Logout</Text>
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
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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

    },
    imgProfile: {
        width: 45,
        height: 45,
        resizeMode: 'contain'
    }

})

export default CustomDrawer;
