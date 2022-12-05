import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

export default function InputText({ onChanged, questionIdx, data }) {
  const questionText = [
    "1. 약을 먹고 불편한 점이 있었다면 자세히 알려줘",
    "2. 특별한 생활 사건들에 대해 자세히 알려줘",
  ];
  let newData = "";

  if (questionIdx === "0") {
    newData = data?.firstQuestion;
  } else {
    newData = data?.secondQuestion;
  }

  const [changeText, setChangeText] = useState(newData);

  useEffect(() => {
    if (String(changeText).length === 0) {
      onChanged("");
    } else {
      onChanged(changeText);
    }
  }, [changeText]);

  const handleChangeText = (text) => {
    setChangeText(text);
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "bold", margin: 10 }}>
          {questionText[questionIdx]}
        </Text>
      </View>
      <View style={{ alignContent: "center" }}>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={(text) => {
            handleChangeText(text);
          }}
          editablex
          value={changeText}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    height: 100,
    borderRadius: 9,
    margin: "5%",
    marginTop: 0,
    marginBottom: 0,
    padding: 10,
  },
});
