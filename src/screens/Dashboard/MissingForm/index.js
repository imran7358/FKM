import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios from 'axios';
const END_URL = '/cashback/missingstore';
import { centerContainer,fontSize,inputBox } from '../../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import request from '../../../utils/request'
const MissingForm = ({navigation}) => {
    const [value, setValue] = useState([]);
    const [noData, setNoData] = useState('');
    const [loadMore, setLoadMore] = useState(true);
    const [loader, setLoader] = useState(false);
    const [store, setStore] = useState ([]);
    const userToken = useSelector(state => {
        return state.user.userToken;
      });

    const getStore = async () => {
        setLoader(true);
        request.post(navigation,Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
               setStore(data.response);

            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoader(false);
            });
    };

    useEffect(() => {
        getStore();
    }, []);
    useEffect(() => {
    }, [value]);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.margi}>
                    <Text style={styles.cbform}>Missing Store</Text>
                </View>
                <View>
                    <Text style={styles.notes}>Kindly Please Select the Store & fill up this form only after you
                        have completed purchase or registration at our partner site.
                        We will verify your details and cashback amount will be
                        added to your account within 2-3 business days
                        (except Saturday and Sunday).</Text>
                </View>

                <View>
                    <Text style={styles.storeName}>Store Name</Text>
                </View>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={store}
                    maxHeight={300}
                    labelField="store"
                    valueField="store_id"
                    placeholder="Select item"
                    placeholderTextColor="grey"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                        setValue(item.store_id);
                    }}
                />
                <TouchableOpacity onPress={(item)=>
                    navigation.navigate('MissingCashBackForm',{storeId:value})} >
                    <View style={styles.loginButton}>
                        <Text style={styles.loginTxt}>Next</Text>
                    </View>
                </TouchableOpacity>





            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    cbform: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    inputText: {
        height: inputBox.height,
        padding: inputBox.padding,
        borderWidth: inputBox.borderWidth,
        marginTop: inputBox.marginTop,
        borderColor: inputBox.borderColor,
        borderRadius: inputBox.borderRadius,
        color: '#333333',
        fontSize: 14,
        backgroundColor: '#fff',
    },
    loginButton: {
        alignItems: centerContainer.alignCenter,
        justifyContent: centerContainer.justifyCenter,
        backgroundColor: '#F27935',
        padding: 10,
        marginTop: 30,
        borderRadius: 6,
        fontWeight: 'bold',
        height: 50,
    },
    loginTxt: {
        fontSize: fontSize.headingFont,
        fontWeight: '900',
        color: '#fff',
    },
    activeTab: {
        color: '#F27935',
        fontWeight: '900',
        borderColor: '#f27935',
        borderBottomWidth: 1,
    },
    txtActive: {
        color: '#f27935',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'capitalize',
    },
    dropdown: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderRadius: 3,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    innerContainer: {
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    notes: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 10,
    },
    storeName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 7,
    },

});

export default MissingForm;



