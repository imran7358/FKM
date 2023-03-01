import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';




const MissingCashback = ({ navigation, route }) => {

    const formik = useFormik({
        validationSchema: yup.object({
            name: yup.string().required(),
        }),
        initialValues: {
            name: '',
        },
    })

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
    const [fileResponse, setFileResponse] = useState({});
    const [formField, setFormField] = useState({});
    const [uploadFile, setuplaodFile] = useState({});
    const [fileError, setFileError] = useState(false);
    const [filType, setFileType] = useState(false);

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
                setClick(data.response);
            }).catch((error) => {
                console.log(error);
            });
    };

    const sendFormReq = async (formD) => {
        axios.post(Config.API_URL + POST_URL, formD,
            {
                headers: {
                    Authorization: userToken,
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                },
            }).then(({ data }) => {
            }).catch((error) => {
                console.log(error.response);
            });
    }
    const handleDocumentSelection = async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.images],
            });
            let arr = response[0]?.name.split(".");
            if (arr[1] === 'JPG' || arr[1] === "jpg" || arr[1] === "PNG" || arr[1] === "png" || arr[1] === "JPEG" || arr[1] === "jpeg") {
                setFileResponse(response);
                setFileType(false);
            }
            else {
                setFileType(true);
            }

        } catch (err) {
            if(DocumentPicker.isCancel(err)){
                Alert.alert('Not Uploaded');
            }
        }
    }
    const handleDocumentSelectionTwo = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.images],
            });
            let arr = response[0]?.name.split(".");
            if (arr[1] === 'JPG' || arr[1] === "jpg" || arr[1] === "PNG" || arr[1] === "png" || arr[1] === "JPEG" || arr[1] === "jpeg") {
            setuplaodFile(response);
            setFileType(false);
            }
            else {
                setFileType(true);
            }

        } catch (err) {
            if(DocumentPicker.isCancel(err)){
                Alert.alert('Not Uploaded');
            }
        }
    }, [])
    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {

    }, [value, fileError, filType]);
    useEffect(() => {

    }, [date])

    useEffect(() => {
        fileResponse[0]?.uri ? setFileError(false) : setFileError(true);
    }, [fileResponse, route.params.storeId], uploadFile);


    const submitForm = () => {
        let fdata = new FormData();
        fdata.append('store', click[0].store);
        fdata.append('device_type', 'ios');
        fdata.append('apiAuth', Config.API_AUTH);
        fdata.append('store_id', route.params.storeId);
        fdata.append('clickid', value);
        fdata.append("fd17", "option");
        sendFormReq(fdata);
    }

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
                    orderId: '',
                    amount: '',
                    product: '',
                    invoice1: '',
                    invoice2: ''
                }}
                    onSubmit={async (values) => {

                        let fdata = new FormData();
                        fdata.append("apiAuth", Config.API_AUTH),
                            fdata.append("device_type", "4"),
                            fdata.append("name", values.name),
                            fdata.append("store_id", route.params.storeId),
                            fdata.append("clickid", value),
                            fdata.append("orderid", values.orderId),
                            fdata.append("amount", values.amount),
                            fdata.append("order_date", moment(date).format('YYYY-MM-DD'))
                        fdata.append("product", values.product),
                            fileError ? '' : fdata.append("invoice", fileResponse[0]),
                            fdata.append("invoice2", uploadFile[0]),
                        sendFormReq(fdata);
                    }}
                    validationSchema={yup.object().shape({
                        name: yup.string().required("Please enter name"),
                        orderId: yup.string().required("Please enter Order Id"),
                        amount: yup.string().required("Please enter Amount"),
                        product: yup.string().required("Please enter Product name"),

                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <View style={styles.container}>
                            <View style={styles.inputBoxContainer} >
                                <TextInput
                                    style={[styles.inputText, styles.lableFont]}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
                                    placeholder="Name"
                                />
                            </View>
                            {touched.name && errors.name &&
                                <Text style={styles.error}>{errors.name}</Text>
                            }

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

                                <View style={styles.inputBoxContainer} >
                                    <TextInput
                                        style={[styles.inputText, styles.lableFont]}
                                        placeholder="Order Id"
                                        value={values.orderId}
                                        onChangeText={handleChange('orderId')}
                                        onBlur={() => setFieldTouched('orderId')}
                                    />
                                </View>
                                {touched.orderId && errors.orderId &&
                                    <Text style={styles.error}>{errors.orderId}</Text>
                                }

                                <View style={styles.inputBoxContainer} >
                                    <TextInput
                                        style={[styles.inputText, styles.lableFont]}
                                        placeholder="Product"
                                        value={values.product}
                                        onChangeText={handleChange('product')}
                                        onBlur={() => setFieldTouched('product')}
                                    />
                                </View>
                                {touched.product && errors.product &&
                                    <Text style={styles.error}>{errors.product}</Text>
                                }

                                <View style={styles.inputBoxContainer} >
                                    <TextInput
                                        style={[styles.inputText, styles.lableFont]}
                                        placeholder="Amount"
                                        value={values.amount}
                                        onChangeText={handleChange('amount')}
                                        onBlur={() => setFieldTouched('amount')}
                                    />
                                </View>
                                {touched.amount && errors.amount &&
                                    <Text style={styles.error}>{errors.amount}</Text>
                                }
                                <View style={[styles.inputBoxContainer, styles.dateCon]}>
                                    <Text>{date.toDateString()}</Text>
                                    <TouchableOpacity onPress={() => setOpen(true)}>
                                        <View style={styles.dateIcon}>
                                            <Image source={require('../../../assets/images/date.png')} style={styles.dateIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.inputBoxContainer, styles.dateCon]}>
                                    <Text
                                        key={"FILE"}
                                        style={styles.uri}
                                        numberOfLines={1}
                                        ellipsizeMode={'middle'}>
                                        {fileResponse[0] ? fileResponse[0]?.name : 'Uplaod File'}
                                    </Text>
                                    <TouchableOpacity onPress={handleDocumentSelection}>
                                        <View style={styles.dateIcon}>
                                            <Image source={require('../../../assets/images/upload.png')} style={styles.dateIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                

                                <View style={[styles.inputBoxContainer, styles.dateCon]}>
                                    <Text
                                        key={"FILE"}
                                        style={styles.uri}
                                        numberOfLines={1}
                                        accept='image/*'
                                        ellipsizeMode={'middle'}>
                                        {uploadFile[0] ? uploadFile[0]?.name : "Upload File"}
                                    </Text>
                                    <TouchableOpacity onPress={handleDocumentSelectionTwo}>
                                        <View style={styles.dateIcon}>
                                            <Image source={require('../../../assets/images/upload.png')} style={styles.dateIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {
                                    fileError ? <View>

                                        <Text>File are required</Text>
                                    </View> : null
                                }
                                {
                                    filType ? <View>
                                        <Text>File not allowed</Text>
                                    </View> : null
                                }

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
        marginTop: 15,
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
    }

});

export default MissingCashback;
