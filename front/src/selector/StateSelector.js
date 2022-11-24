import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function StateSelector({ isChanged, data }) {
  const item = [
    "극도로 심한 들뜸으로 입원중에도 증상조절이 안되는 상태",
    "극도로 들뜸. 환청이나 망상이 심하여 입원을 요하는 상태",
    "감당하기 힘들 만큼 일을 벌이고 기고만장하다",
    "오바한다, 나선다, 설친다, 자신감이 지나친다",
    "말이나 하고싶은게 많고 의욕, 자신감이 차있다",
    "기분이 좋고, 즐겁고, 신나고 의욕적이다",
    "기분이 보통이고 편안한 상태",
    "시큰둥하고 의욕이 다소 떨어지나, 할 일은 다 한다",
    "우울하고 자신감과 의욕, 기운이 떨어진다. 생활에 약간의 지장이 있다",
    "꽤 우울하거나 쳐진다. 외출, 쇼핑 등 사회생활에 뚜렷한 지장이 있다",
    "심하게 우울하거나 쳐진다. 학교, 직장을 못 나가거나, 집안 일을 못한다",
    "극도로 우울하거나 쳐진다. 자신을 돌보지 못하여 입원을 요하는 상태",
    "극도로 심한 불안, 초조, 자살사고, 식물인간 상태",
  ];
  const [text, setText] = useState("");
  const placeholder = data ? item[6 - Number(data)] : "기분을 골라보세요";
  // const placeholder = "기분을 골라보세요";
  const [changeValue, setChangeValue] = useState("");
  useEffect(() => {
    isChanged(changeValue);
    setText(changeValue);
  });

  return (
    <>
      <Text style={{ fontSize: 13, fontWeight: "bold", margin: 10 }}>
        3. 오늘 하루를 떠올리고 아래 표에서 어울리는 나의 상태를 골라줘
      </Text>
      <RNPickerSelect
        textInputProps={{ underlineColorAndroid: "transparent" }}
        placeholder={{
          label: placeholder,
        }}
        fixAndroidTouchableBug={true}
        value={text}
        onValueChange={(value) => setChangeValue(value)}
        useNativeAndroidPickerStyle={false}
        // item 을 loop로 구현 필요
        items={[
          {
            label: item[0],
            value: "6",
            key: "6",
          },
          {
            label: item[1],
            value: "5",
            key: "5",
          },
          {
            label: item[2],
            value: "4",
            key: "4",
          },
          {
            label: item[3],
            value: "3",
            key: "3",
          },
          {
            label: item[4],
            value: "2",
            key: "2",
          },
          {
            label: item[5],
            value: "1",
            key: "1",
          },
          { label: item[6], value: "0", key: "0" },
          {
            label: item[7],
            value: "-1",
            key: "-1",
          },
          {
            label: item[8],
            value: "-2",
            key: "-2",
          },
          {
            label: item[9],
            value: "-3",
            key: "-3",
          },
          {
            label: item[10],
            value: "-4",
            key: "-4",
          },
          {
            label: item[11],
            value: "-5",
            key: "-5",
          },
          {
            label: item[12],
            value: "-6",
            key: "-6",
          },
        ]}
        style={pickerSelectStyles}
      />
    </>
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
