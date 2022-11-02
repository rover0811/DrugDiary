import React, { useState } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function SleepTimeSelector() {
  const [text, setText] = useState("");
  const placeholder = "시간을 선택하세요";

  const onChangeText = (value) => {
    setText(value);
  };
  return (
    <RNPickerSelect
      textInputProps={{ underlineColorAndroid: "transparent" }}
      placeholder={{
        label: placeholder,
      }}
      fixAndroidTouchableBug={true}
      value={text}
      onValueChange={(value) => onChangeText(value)}
      useNativeAndroidPickerStyle={false}
      items={[
        { label: "0시간", value: "0" },
        { label: "1시간", value: "1" },
        { label: "2시간", value: "2" },
        { label: "3시간", value: "3" },
        { label: "4시간", value: "4" },
        { label: "5시간", value: "5" },
        { label: "6시간", value: "6" },
        { label: "7시간", value: "7" },
        { label: "8시간", value: "8" },
        { label: "9시간", value: "9" },
        { label: "10시간", value: "10" },
        { label: "11시간", value: "11" },
        { label: "12시간", value: "12" },
        { label: "13시간", value: "13" },
        { label: "14시간", value: "14" },
        { label: "15시간", value: "15" },
        { label: "16시간", value: "16" },
        { label: "17시간", value: "17" },
        { label: "18시간", value: "18" },
        { label: "19시간", value: "19" },
        { label: "20시간", value: "20" },
        { label: "21시간", value: "21" },
        { label: "22시간", value: "22" },
        { label: "23시간", value: "23" },
        { label: "24시간", value: "24" },
      ]}
      style={pickerSelectStyles}
    />
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "#000",
    height: 30,
    width: "90%",
    borderRadius: 9,
    padding: 10,
    backgroundColor: "#D9D9D9",
    margin: "5%",
    marginTop: 0,
  },
  inputAndroid: {
    fontSize: 16,
    color: "#000",
    height: 30,
    width: "90%",
    borderRadius: 9,
    padding: 10,
    backgroundColor: "#D9D9D9",
    margin: "5%",
    marginTop: 0,
  },
});
