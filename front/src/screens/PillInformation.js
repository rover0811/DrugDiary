import React, {useEffect, useState} from "react";
import axios from "axios";
import {View} from "react-native";
export default function Pills(){
    const [result, setResult] = useState(null);

    const message = async ()=>{
        try{
            let res = await axios.get('http://127.0.0.1:8000/pill');
            let result = res.data;
            setResult(result)
        } catch(e){
            console.log(e)
        }
    };

    useEffect(()=>{
        message()
    }, [])

    return(
        <View>
            {result}
        </View>
    )
}
