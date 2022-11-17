import { React, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

export default function AddView() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    if (result.cancelled) {
      return null;
    }
    console.log(result.uri);
    setImageUrl(result.uri);
  };
  return (
    <View style={{ height: "100%", backgroundColor: "white", padding: 18 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>최지우님,</Text>
      <Text style={{ fontSize: 20 }}>복용하고 있는 약을 추가해주세요</Text>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="약의 정확한 이름을 입력해주세요"
          style={{ marginLeft: 20 }}
        />
        <TouchableOpacity
          style={{ marginTop: 10, marginLeft: 100, marginBottom: 5 }}
        >
          <MaterialCommunityIcons name={"magnify"} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
          onPress={uploadImage}
        >
          <Text style={styles.textStyle}>촬영하여 약 저장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
          // onPress={storeAndCloseModal}
        >
          <Text style={styles.textStyle}>약 직접 입력</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
          // onPress={storeAndCloseModal}
        >
          <Text style={styles.textStyle}>약 바구니로 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#1B4B66",
    width: "90%",
    height: 55,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonView: {
    height: "100%",
    bottom: 100,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});