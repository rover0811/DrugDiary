import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function InputText() {
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={{ alignContent: "center" }}>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={onChangeNumber}
        editable
      />
    </View>
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
  },
});
