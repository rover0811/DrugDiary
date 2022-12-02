import { React, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SpeedDial } from "@rneui/themed";
import PillCard from "./PillCard";
import PillDetail from "./PillDetail";
import axios from "axios";
import SearchModal from "./SearchModal";
import { getAllKeys, getData, storeData } from "../../DB/Store";

export default function AddView() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);

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
    });
    if (result.cancelled) {
      return null;
    }
    const imageUri = result.uri;
    const filename = imageUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("image", { uri: imageUri, name: filename, type });
    try {
      console.log("trytrytry");
      await axios({
        method: "post",
        url: "http://52.78.57.119/pill/input_image",
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      })
        .then((res) => {
          if (res.data.items.length !== 0) {
            res.data.items.map((value, index) => {
              pills.push(res.data.items[index]);
            });
            // pills.push(res.data.items);
          } else alert("약 정보가 없습니다.\n 다시 한번 찍어주세요");
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("fin");
    } catch {
      console.log("errrrr");
    }
  };

  const [clickPill, setClickPill] = useState(0);
  const handleClickPill = (pillIndex) => {
    setClickPill(pillIndex);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [pills, setPills] = useState([]);
  // useState(() => {
  //   getData("pillsList")
  //     .then((res) => {
  //       setPills(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [openModal]);

  return (
    <View style={{ height: "100%", backgroundColor: "white", padding: 18 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        현재 최지우님이 복용하고 있는 약입니다
      </Text>
      <PillCard pills={pills} onPress={handleClickPill} />
      <PillDetail pills={pills} index={clickPill} />
      <SpeedDial
        isOpen={open}
        icon={
          <MaterialCommunityIcons name={"pill"} size={20} color={"white"} />
        }
        openIcon={
          <MaterialCommunityIcons name={"pill"} size={20} color={"white"} />
        }
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color="#1B4B66"
      >
        <SpeedDial.Action
          icon={{ name: "camera", color: "#fff" }}
          title="사진을 찍어서 약 추가하기"
          onPress={uploadImage}
          color="#1B4B66"
          titleStyle={{ backgroundColor: "rgba(0,0,0,0)", color: "white" }}
        />
        <SpeedDial.Action
          icon={{ name: "search", color: "#fff" }}
          title="검색해서 약 추가하기"
          onPress={() => {
            setOpenModal(true);
          }}
          color="#1B4B66"
          titleStyle={{ backgroundColor: "rgba(0,0,0,0)", color: "white" }}
        />
      </SpeedDial>
      <SearchModal
        openSearchModal={openModal}
        closeSearchModal={handleCloseModal}
        pills={pills}
      />
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
    // height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: "center",
  },
});
