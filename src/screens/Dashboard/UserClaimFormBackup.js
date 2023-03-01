import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios, { all } from 'axios';
const END_URL = '/cashback/userclaimform';
const POST_URL = '/cashback/userclaimdata';
import { centerContainer, fontSize, inputBox } from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ImgToBase64 from 'react-native-image-base64';
import Loader from '../../components/Loader';

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
    const [amount, setAmount] = useState(0);
    const [fileResponse, setFileResponse] = useState({});
    const [field, setField] = useState([]);
    const [formField, setFormField] = useState({})
    const [allowed, setAllowed] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState("");
    useEffect(() => {
    }, [fileResponse, allowed])

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
                setClick(data.response.userclicks);
                setField(data.response.claimform);

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
                setFormField([{}]);
                setFileResponse([{}]);

            }).catch((error) => {
                console.log(error.response);
            });
    }

    const handleDocumentSelection = async (item, fieldq) => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.images],
            });
            let arr = response[0]?.name.split('.');
            if (arr[1] === 'jpg' || arr[1] === 'JPG' || arr[1] === 'jpeg' || arr[1] === 'JPEG' || arr[1] === 'png' || arr[1] === 'PNG') {
                const tempFile = { ...fileResponse };
                tempFile[fieldq] = response;
                setFileResponse(tempFile);
                setAllowed(false);
            }
            else {
                setAllowed(true);
            }


        } catch (err) {
            console.log("Image error", err)
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
    }, [date]);

    useEffect(() => {

    }, [value]);

    const submitForm = () => {
        let fdata = new FormData();
        fdata.append('store', click[0].store);
        fdata.append('device_type', 'ios');
        fdata.append('apiAuth', Config.API_AUTH);
        fdata.append('store_id', route.params.storeId);
        fdata.append('clickid', value);

        for (let i = 0; i < field.length; i++) {
            const item = field[i]
            switch (item.type) {
                case "text":
                    if (formField[item.field_name]) {
                        fdata.append(item.field_name, formField[item.field_name]);
                    }
                    break;
                case "date":
                    if (date) {
                        fdata.append(item.field_name, moment(date).format('YYYY-MM-DD'));
                    }
                    break;
                case "file":
                    if (fileResponse[item.field_name][0].uri) {
                        fdata.append(item.field_name, fileResponse[item.field_name][0]);
                    }
                    break;
                default:
                    if (formField[item.field_name]) {
                        fdata.append(item.field_name, formField[item.field_name]);
                    }
                    break;
            }
        }
        const submittedKeys = Object.keys(formField)
        for (let i = 0; i < field.length; i++) {
            const item = field[i]
            if (!["file", "date"].includes(item.type) && item.is_mandatory == "1" && !submittedKeys.includes(item.field_name)) {
                setError("One or more mandatory field is empty.");
                return;
            }
        }
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

                <View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={click}
                        maxHeight={300}
                        labelField="clickid"
                        valueField="clickid"
                        placeholder="Select item"
                        placeholderTextColor="grey"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={e => {
                            setValue(e.clickid);
                        }}

                    />
                    {
                        field.length ? field.map((item, i) => {
                            if (item.type === 'text') {
                                return <View style={styles.inputBoxContainer} key={i}>
                                    <TextInput
                                        style={[styles.inputText, styles.lableFont]}
                                        placeholder={item.is_mandatory == '1' ? item.placeholder + ' ' + ('required') : item.placeholder}
                                        value={formField[item.field_name]}
                                        // required={item.is_mandatory == '1'}
                                        onChangeText={(e) => {
                                            const temp = { ...formField };
                                            temp[item.field_name] = e;
                                            setFormField(temp);
                                        }}

                                    />
                                </View>
                            }
                            else if (item.type === 'file') {

                                return <View style={[styles.inputBoxContainer, styles.dateCon]} key={i}>
                                    <Text
                                        key={"FILE" + i}
                                        style={styles.uri}
                                        numberOfLines={1}
                                        ellipsizeMode={'middle'}>
                                        {fileResponse.hasOwnProperty(item.field_name) ? fileResponse[item.field_name][0].name : "Uploa File"}
                                    </Text>


                                    <TouchableOpacity onPress={(i1) => {
                                        handleDocumentSelection(i1, item.field_name)
                                    }}>
                                        <View style={styles.dateIcon}>
                                            <Image source={require('../../assets/images/upload.png')} style={styles.dateIcon} />
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            }


                            else if (item.type === 'date') {
                                return <>
                                    <View key={i} style={[styles.inputBoxContainer, styles.dateCon]}>
                                        <Text>{date.toDateString()}</Text>
                                        <TouchableOpacity onPress={() => setOpen(true)}>
                                            <View style={styles.dateIcon}>
                                                <Image source={require('../../assets/images/date.png')} style={styles.dateIcon} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }

                            else {
                                return <View key={i} style={styles.inputBoxContainer}>
                                    <TextInput
                                        style={[styles.inputText, styles.lableFont]}
                                        placeholder={item.is_mandatory == '1' ? item.placeholder + ' ' + ('required') : item.placeholder}
                                        value={formField[item.field_name]}
                                        onChangeText={(e) => {
                                            const temp = { ...formField };
                                            temp[item.field_name] = e;
                                            setFormField(temp);
                                        }}
                                    />
                                </View>

                            }

                        }) : null
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
                    {
                        allowed ? <View style={styles.allowedImg}>
                            <Text style={styles.allowedlbl}>Only (jpg/png/jpeg) images are allowed</Text>
                        </View> : null
                    }
                    {
                        error ? <View>
                            <Text>{error}</Text>
                        </View> : null
                    }
                    <TouchableOpacity onPress={submitForm}>
                        <View style={styles.loginButton}>
                            <Text style={styles.loginTxt}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>

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
    allowedImg: {
        marginTop: 10,

    },
    allowedlbl: {
        fontSize: 12,
        color: 'red',
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
    flieUpload: {

    },
    uri: {
        width: '70%',
        flexWrap: 'wrap',
    }

});

export default UserClaimForm;
