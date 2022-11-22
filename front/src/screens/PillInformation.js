import React, {useEffect, useState} from "react";
import axios from "axios";
import {View, Text} from "react-native";
export default function Pills(){
    const [result, setResult] = useState(String);

    // const message = async ()=>{
    //     try{
    //         let res = await axios.get('http://127.0.0.1:8000/pill/input_name?name=한미아스피린장용정100밀리그램');
    //         let result = res.data;
    //         setResult(result)
    //         console.log(result)
    //     } catch(e){
    //         console.log("axios error")
    //     }
    // };

    useEffect(()=>{
        const init = async () => {
            try {
                console.log("before axios get");
                // const res = await axios.get('http://192.168.0.1:8000/pill/input_name',{params:{name:"게보린"}});
                const res = await axios.get('http://192.168.0.1:8000/pill/input_name?name=게보린').then(console.log("get!"))

                console.log("after axois get");
                result=res.data
              setResult(pillinfos);
                console.log("hello")
            } catch (e) {
                console.log("axios error")
            }
          };
          init();
          console.log("finished init()");
    }, [])

    //const pilldata = result.map((i))

    const pillinfos = JSON.stringify(result);

    return(
            <Text>{pillinfos}</Text>
        )
}
