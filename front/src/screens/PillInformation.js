import React, {useEffect, useState} from "react";
import axios from "axios";
import {View, Text} from "react-native";
export default function Pills(){
    const [result, setResult] = useState(String);

    const message = async ()=>{
        try{
            let res = await axios.get('http://203.253.13.46:8000/pill');
            let result = res.data;
            setResult(result)
            console.log(result)
        } catch(e){
            console.log(e)
        }
    };

    useEffect(()=>{
        message()
    }, [])

    const pilldata = result.map((i))

    return(
            <Text>{result.ITEM_NAME}</Text>
        )
}
