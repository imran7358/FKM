import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput,Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import Config from 'react-native-config';
import axios from 'axios';
const END_URL = '/cashback/userclaimform';
const POST_URL = '/cashback/userclaimdata';
import { centerContainer, fontSize, inputBox } from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import moment from 'moment';


const UserClaimForm = ({ navigation, route }) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
      });
    const [value, setValue] = useState("");
    const [loadMore, setLoadMore] = useState(true);
    const [loader, setLoader] = useState(false);
    const [click, setClick] = useState([]);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [amount,setAmount] = useState(0);
    const [fileResponse, setFileResponse] = useState([]);
    const [field, setField] = useState([]);

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
                console.log('qasim ali ',data.response.userclicks);
                setClick(data.response.userclicks);
                setField(data.response.claimform);

            }).catch((error) => {
                console.log(error);
            });
    };

    const sendFormReq = async(formD) => {
        console.log("Sending request-->>>",formD);
        axios.post(Config.API_URL + POST_URL, formD ,
            {
                headers: {
                    Authorization: userToken,
                    "Content-Type" : "multipart/form-data" ,
                    'Accept': 'application/json',
                },
            }).then(({ data }) => {
                console.log("rEsponse came",data);
            }).catch((error) => {
                console.log(error.response);
            });
    }
    const handleDocumentSelection = useCallback(async (item) => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.images],
            });
            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    useEffect(() => {
        getDetails();
        console.log('date', date.toDateString())
    }, [value, date]);
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

                <View>
                    <Text style={styles.storeName}>Store Name</Text>
                </View>
                <Formik initialValues={{
                    // email: '',
                    // mobile: '',
                    // orderId: '',
                    // orderAmount: '',
                    // flieUpload: '',
                    // comment: '',
                }}
                    onSubmit={values => {
                        let fdata = new FormData();
                        fdata.append("store",click[0].store);
                        fdata.append("device_type","ios");
                        fdata.append("apiAuth",Config.API_AUTH);
                        fdata.append("store_id",route.params.storeId);
                        fdata.append("clickid",value);
                        field.length ? field.map((item, i)=>{
                            if (item.type == "text"){
                                fdata.append(item.field_name,item.field_name.value);
                            }
                            else if (item.type == 'date'){
                                fdata.append(item.field_name, moment(date).format('YYYY-MM-DD'));
                            }

                            else if (item.type == 'file'){
                                fdata.append(item.field_name,fileResponse[0]);
                            }

                            else {
                                fdata.append(item.field_name,item.field_name.value);
                            }
                        }) : null
                        // fdata.append("fd17","option");
                        // fdata.append("fd7",values.orderId);
                        // fdata.append("fd3",values.mobile);
                        // fdata.append("fd2",values.email);
                        // fdata.append("fd9",values.orderAmount);
                        console.log("FOrm data-->>",fdata);
                        console.log("My value-->>>",values);
                        sendFormReq(fdata);

                    }}
                    validationSchema={yup.object().shape({

                        // mobile: yup
                        //     .string().required('Please Enter phone no'),
                        // orderId: yup
                        //     .string().required('Please enter order id'),
                        // orderAmount: yup
                        //     .string().required('Please enter order amount'),
                        // email: yup
                        //     .string()
                        //     .email()
                        //     .required('Please enter email id'),
                    })}
                >

                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <View>
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
                            {
                                field.length ? field.map((item, i)=>{
                                    if (item.type === 'text'){
                                        return  <View style={styles.inputBoxContainer} key={i}>
                                    <TextInput
                                        style={[styles.inputText, styles.lableFont]}
                                        onChangeText={handleChange(item.field_name)}
                                        onBlur={() => setFieldTouched(item.field_name)}
                                        placeholder={item.placeholder}
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={styles.error}>{errors.email}</Text>
                                    }
                                </View>
                                    }

                                    else if (item.type ===  'file'){

                                        return <View style={[styles.inputBoxContainer, styles.dateCon]} key={i}>
                                        {fileResponse.length ? fileResponse.map((file, index) => (
                                            <Text
                                                key={index.toString()}
                                                style={styles.uri}
                                                numberOfLines={1}
                                                ellipsizeMode={'middle'}>
                                                {file?.uri}
                                            </Text>
                                        )):
                                        <View><Text>Upload File</Text></View>
                                        }
                                        <TouchableOpacity onPress={(handleDocumentSelection)}>
                                        <View style={styles.dateIcon}>
                                                <Image source={require('../../assets/images/upload.png')} style={styles.dateIcon} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    }

                                    else if (item.type === 'date'){

                                        return <View style={[styles.inputBoxContainer, styles.dateCon]}>
                                        <Text>{date.toDateString()}</Text>
                                        <TouchableOpacity onPress={() => setOpen(true)}>
                                            <View style={styles.dateIcon}>
                                                <Image source={require('../../assets/images/date.png')} style={styles.dateIcon} />
                                            </View>
                                        </TouchableOpacity>
        
                                        {touched.date && errors.date &&
                                            <Text style={styles.error}>{errors.date}</Text>
                                        }
                                    </View>

                                    }

                                    else {
                                       return <View style={styles.inputBoxContainer}>
                                        <TextInput
                                            style={[styles.inputText, styles.lableFont]}
                                            onChangeText={handleChange(item.field_name)}
                                            onBlur={() => setFieldTouched(item.field_name)}
                                            placeholder={item.placeholder}
                                        />
                                        {touched.email && errors.email &&
                                            <Text style={styles.error}>{errors.email}</Text>
                                        }
                                    </View>

                                    }

                                }):null
                            }
                            {/* <View style={styles.inputBoxContainer}>
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
                            </View> */}

                            {/* <View style={styles.inputBoxContainer}>
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
                            </View> */}
                            {/* <View style={styles.inputBoxContainer}>
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
                            </View> */}
                           

                            {/* <View style={styles.inputBoxContainer}>
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
                            </View> */}
                           

                            {/* <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputText, styles.lableFont]}
                                    value={values.comment}
                                    onChangeText={handleChange('comment')}
                                    onBlur={() => setFieldTouched('comment')}
                                    placeholder="Comment"
                                    multiline={true}
                                    numberOfLines={12}
                                />
                                {touched.comment && errors.comment &&
                                    <Text style={styles.error}>{errors.comment}</Text>
                                }
                            </View> */}

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
    flieUpload:{

    },
    uri: {
      width: '70%',
        flexWrap: 'wrap',
    }

});

export default UserClaimForm;
