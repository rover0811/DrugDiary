import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";

export default function InputText({ onChanged, questionIdx, data }) {
  const questionText = [
    "1. 약을 먹고 불편한 점이 있었다면 자세히 알려줘",
    "2. 특별한 생활 사건들에 대해 자세히 알려줘",
  ];
  const [changeText, setChangeText] = useState(data);
  useEffect(() => {
    // if (canEdit) {
    //   onChanged(changeText);
    // } else if (!canEdit && !data) {
    //   onChanged(changeText);
    // }
    if (data === changeText) {
      onChanged(null);
    } else {
      onChanged(changeText);
    }
  }, [changeText]);

  useEffect(() => console.log(data), []);

  const handleChangeText = (text) => {
    setChangeText(text);
  };

  const [canEdit, setCanEdit] = useState(false);
  const handleEdit = (bool) => {
    setCanEdit(bool);
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
        {data && !canEdit ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#1B4B66",
              width: 25,
              height: 25,
              marginRight: 10,
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              handleChangeText(data);
              handleEdit(true);
            }}
          >
            <Octicons name="pencil" color={"white"} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{ alignContent: "center" }}>
        {data === null ? (
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(text) => handleChangeText(text)}
            editablex
          />
        ) : (
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(text) => {
              handleChangeText(text);
            }}
            editablex
            value={canEdit ? changeText : data}
            // placeholder={data}
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
