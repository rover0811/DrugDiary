import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

export default function InputText({ isChanged, questionIdx, data }) {
  const questionText = [
    "1. 약을 먹고 불편한 점이 있었다면 자세히 알려줘",
    "2. 특별한 생활 사건들에 대해 자세히 알려줘",
  ];
  const [changeText, setChangeText] = useState();
  useEffect(() => {
    isChanged(changeText);
    // console.log(changeText);
  });

  return (
    <>
      <Text style={{ fontSize: 13, fontWeight: "bold", margin: 10 }}>
        {questionText[questionIdx]}
      </Text>
      <View style={{ alignContent: "center" }}>
        {data === null ? (
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(text) => setChangeText(text)}
            editablex
          />
        ) : (
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(text) => setChangeText(text)}
            editablex
            // value={changeText}
            placeholder={data}
          />
        )}
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
