import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function StateSelector() {
  const [text, setText] = useState("");
  const placeholder = "기분을 골라보세요";

  const onChangeText = (value) => {
    setText(value);
  };
  return (
    // <View style={{  }}>
    <RNPickerSelect
      textInputProps={{ underlineColorAndroid: "transparent" }}
      placeholder={{
        label: placeholder,
      }}
      fixAndroidTouchableBug={true}
      value={text}
      onValueChange={(value) => onChangeText(value)}
      useNativeAndroidPickerStyle={false}
      // item 을 loop로 구현 필요
      items={[
        {
          label: "극도로 심한 들뜸으로 입원중에도 증상조절이 안되는 상태",
          value: "6",
          key: "6",
        },
        {
          label: "극도로 들뜸. 환청이나 망상이 심하여 입원을 요하는 상태",
          value: "5",
          key: "5",
        },
        {
          label: "감당하기 힘들 만큼 일을 벌이고 기고만장하다",
          value: "4",
          key: "4",
        },
        {
          label: "오바한다, 나선다, 설친다, 자신감이 지나친다",
          value: "3",
          key: "3",
        },
        {
          label: "말이나 하고싶은게 많고 의욕, 자신감이 차있다",
          value: "2",
          key: "2",
        },
        {
          label: "기분이 좋고, 즐겁고, 신나고 의욕적이다",
          value: "1",
          key: "1",
        },
        { label: "기분이 보통이고 편안한 상태", value: "0", key: "0" },
        {
          label: "시큰둥하고 의욕이 다소 떨어지나, 할 일은 다 한다",
          value: "-1",
          key: "-1",
        },
        {
          label:
            "우울하고 자신감과 의욕, 기운이 떨어진다. 생활에 약간의 지장이 있다",
          value: "-2",
          key: "-2",
        },
        {
          label:
            "꽤 우울하거나 쳐진다. 외출, 쇼핑 등 사회생활에 뚜렷한 지장이 있다",
          value: "-3",
          key: "-3",
        },
        {
          label:
            "심하게 우울하거나 쳐진다. 학교, 직장을 못 나가거나, 집안 일을 못한다",
          value: "-4",
          key: "-4",
        },
        {
          label:
            "극도로 우울하거나 쳐진다. 자신을 돌보지 못하여 입원을 요하는 상태",
          value: "-5",
          key: "-5",
        },
        {
          label: "극도로 심한 불안, 초조, 자살사고, 식물인간 상태",
          value: "-6",
          key: "-6",
        },
      ]}
      style={pickerSelectStyles}
    />
    // </View>
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

// test
