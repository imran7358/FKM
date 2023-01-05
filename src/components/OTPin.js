import React, { useRef, useState } from 'react';
import {TextInput,View} from 'react-native';
const OTPin = (props) => {
    const refs = useRef([]);
    const arr = Array.from(Array(props.in));
    const [p,setp] = useState(arr);
    return (
        <>
        <View>
            {arr.map((e,i)=><TextInput 
            key={i}
            maxLength={1}
            placeholder="A" 
            ref={(ref) => {refs.current[i] = ref}} 
            value={p[i]}
            onChangeText={(t)=>{
                if(t.length <= 1){
                    let inp = p;
                    p[i] = t;
                    setp(inp);
                }
                if(i+1<arr.length){
                    refs.current[i+1].focus();
                }
                else{
                    props.onDone(p.join(''));
                }
            }}></TextInput>
            )}
        </View>
        </>
    );
};

export default OTPin;
