import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import Config from 'react-native-config';
import axios from 'axios';
const END_URL = '/cashback/missingstoreclicks';
const POST_URL = '/cashback/savemissing';
import { centerContainer, fontSize, inputBox } from '../../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import moment from 'moment';


const MissingCashback = ({ navigation, route }) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const [value, setValue] = useState("");
    const [loadMore, setLoadMore] = useState(true);
    const [loader, setLoader] = useState(false);
    const [click, setClick] = useState([]);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [fileResponse, setFileResponse] = useState([]);

    const getDetails = async () => {

        axios.post(Config.API_URL + END_URL, {
            'apiAuth': Config.API_AUTH,
            'device_type': 4,
            'store_id': route.params.storeId,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
                console.log('qasim ali ', data.response);
                setClick(data.response);
            }).catch((error) => {
                console.log(error);
            });
    };

    const sendFormReq = async (formD) => {
        console.log("Sending request-->>>", formD);
        axios.post(Config.API_URL + POST_URL, formD,
            {
                headers: {
                    Authorization: userToken,
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                },
            }).then(({ data }) => {
                console.log("rEsponse came", data);
            }).catch((error) => {
                console.log(error.response);
            });

    }
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.allFiles],
            });
            console.log("File Response",
                response[0].uri,
                response[0].type,
                response[0].name,
                response[0].size,
            );
            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    useEffect(() => {
        getDetails();
        console.log('date', date.toDateString())
    }, [value, date])
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.margi}>
                    <Text style={styles.cbform}>Cashback Claimform</Text>
                </View>
                <View>
                    <Text style={styles.notes}>Kindly fill up this form only after you have completed the purchase at our partner site. We will verify your details and the cashback amount will be added to your account within 2 -3 Business days (except Saturday & Sunday )

                    </Text>
                </View>
                <Formik initialValues={{
                    name: '',
                    storeId:'',
                    email: '',
                    mobile: '',
                    orderId: '',
                    orderAmount: '',
                    product: '',
                }}
                    onSubmit={values => {

                        let fdata = new FormData();
                        fdata.append('device_type', 'ios');
                        fdata.append('apiAuth', Config.API_AUTH);
                        fdata.append('name', values.name);
                        fdata.append('store_id', values.storeId);
                        fdata.append('clickid', value);
                        fdata.append('orderid', values.orderId);
                        fdata.append('amount', values.orderAmount);
                        fdata.append('order_date', moment(date).format('YYYY-MM-DD'));
                        fdata.append('product', values.product);

                        fdata.append('store', click[0].store);
                        fdata.append('store_id', route.params.storeId);
                        
                        fdata.append('fd17', 'option');
                       
                        fdata.append('fd3', values.mobile);
                        fdata.append('fd2', values.email);
                        
                       
                        fdata.append('fd10',
                            {
                                type: 'image/jpg',
                                uri: fileResponse[0],
                                name: fileResponse[0]
                            });
                        console.log('FOrm data-->>', fdata);
                        console.log('My value-->>>', values);
                        sendFormReq(fdata);

                    }}
                    validationSchema={yup.object().shape({
                        // clickId: yup
                        //     .string()
                        //     .required('Please select click id'),
                        mobile: yup
                            .string().required('Please Enter phone no'),
                        orderId: yup
                            .string().required('Please enter order id'),
                        orderAmount: yup
                            .string().required('Please enter order amount'),
                        email: yup
                            .string()
                            .email()
                            .required('Please enter email id'),
                        flieUpload: yup
                            .string().required('Please upload file'),
                    })}
                >

                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <View>
                             <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputText, styles.lableFont]}
                                    value={values.email}
                                    onChangeText={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
                                    placeholder="Name"
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.error}>{errors.email}</Text>
                                }
                            </View>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={click}
                                maxHeight={300}
                                labelField="created_time"
                                valueField="clickid"
                                placeholder="Select item"
                                placeholderTextColor="grey"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    setValue(item.clickid);
                                }}

                            />
                            <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputText, styles.lableFont]}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    placeholder="Email"
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.error}>{errors.email}</Text>
                                }
                            </View>

                            <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputText, styles.lableFont]}
                                    value={values.mobile}
                                    onChangeText={handleChange('mobile')}
                                    onBlur={() => setFieldTouched('mobile')}
                                    placeholder="Mobile"
                                />
                                {touched.mobile && errors.mobile &&
                                    <Text style={styles.error}>{errors.mobile}</Text>
                                }
                            </View>
                            <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputText, styles.lableFont]}
                                    value={values.orderId}
                                    onChangeText={handleChange('orderId')}
                                    onBlur={() => setFieldTouched('orderId')}
                                    placeholder="Order Id"
                                />
                                {touched.orderId && errors.orderId &&
                                    <Text style={styles.error}>{errors.orderId}</Text>
                                }
                            </View>
                            <View style={[styles.inputBoxContainer, styles.dateCon]}>
                                <Text>{date.toDateString()}</Text>
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    <View style={styles.dateIcon}>
                                        <Image source={require('../../../assets/images/date.png')} style={styles.dateIcon} />
                                    </View>
                                </TouchableOpacity>

                                {touched.date && errors.date &&
                                    <Text style={styles.error}>{errors.date}</Text>
                                }
                            </View>

                            <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputText, styles.lableFont]}
                                    value={values.orderAmount}
                                    onChangeText={handleChange('orderAmount')}
                                    onBlur={() => setFieldTouched('orderAmount')}
                                    placeholder="Amount"
                                />
                                {touched.orderAmount && errors.orderAmount &&
                                    <Text style={styles.error}>{errors.orderAmount}</Text>
                                }
                            </View>
                            <View style={[styles.inputBoxContainer, styles.dateCon]}>
                                {fileResponse.length ? fileResponse.map((file, index) => (
                                    <Text
                                        key={index.toString()}
                                        style={styles.uri}
                                        numberOfLines={1}
                                        ellipsizeMode={'middle'}>
                                        {file?.uri}
                                    </Text>
                                )) :
                                    <View><Text>Upload File</Text></View>
                                }
                                <TouchableOpacity onPress={handleDocumentSelection}>
                                    <View style={styles.dateIcon}>
                                        <Image source={require('../../../assets/images/upload.png')} style={styles.dateIcon} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false);
                                    setDate(date);
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                                mode="date"
                            />

                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.loginButton}>
                                    <Text style={styles.loginTxt}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    )}
                </Formik>

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
        marginTop: inputBox.marginTop,
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
    dateCon: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: inputBox.height,
        padding: inputBox.padding,
        borderWidth: inputBox.borderWidth,
        marginTop: inputBox.marginTop,
        borderColor: inputBox.borderColor,
        borderRadius: inputBox.borderRadius,
        color: '#333333',
        fontSize: 14,
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
    },
    dateIcon: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
    error: {
        fontSize: 12,
        color: '#FF0D10',
        marginTop: 7,
    },
    flieUpload: {

    },
    uri: {
        width: '70%',
        flexWrap: 'wrap',
    },

});

export default MissingCashback;
