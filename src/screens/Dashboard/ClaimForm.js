import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from "react-native-gesture-handler";

const ClaimForm = () => {
    const [selectedValue, setSelectedValue] = useState({

    });
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.container}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    mainContainer: {
        backgroundColor: '#fff',
        padding: 24,
    },
    innerContainer: {
        backgroundColor: '#F7F7F7',
        borderRadius: 3,
        padding: 15,
    }
});

export default ClaimForm;
