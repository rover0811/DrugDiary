import { React, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SpeedDial } from "@rneui/themed";
import PillCard from "./PillCard";
import PillDetail from "./PillDetail";
import axios from "axios";
import SearchModal from "./SearchModal";
import { getData, setAsyncPills } from "../../DB/Store";

export default function AddView() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pills, setPills] = useState([]);
  const handleSetPills = (pills) => {
    if (typeof pills === "undefined") setPills([]);
    else setPills([...pills]);
  };

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
      quality: 0.6,
    });
    setLoading(true);
    if (result.cancelled) {
      setLoading(false);
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
            res.data.items.map((value) => {
              pills.push(value);
            });
            setAsyncPills(res.data.items);
            setOpen(false);
          } else alert("약 정보가 없습니다.\n 다시 한번 찍어주세요");
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          alert("다시 한 번 찍어주세요");
        });
      console.log("fin");
    } catch {
      setLoading(false);
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

  useEffect(() => {
    const init = async () => {
      await getData("pillsList")
        .then((res) => {
          setPills(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    init();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ width: "100%", height: "100%" }}>
        {loading ? (
          <ActivityIndicator
            size={30}
            color="#1B4B66"
            style={styles.ActivityIndicator}
          />
        ) : null}
        <View style={{ height: "100%", backgroundColor: "white", padding: 18 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            현재 최지우님이 복용하고 있는 약입니다
          </Text>
          <PillCard pills={pills} onPress={handleClickPill} />
          <PillDetail
            pills={pills}
            index={clickPill}
            handleSetPills={handleSetPills}
          />
        </View>
        <SpeedDial
          isOpen={open}
          icon={
            <MaterialCommunityIcons name={"pill"} size={20} color={"white"} />
          }
          openIcon={
            <MaterialCommunityIcons name={"pill"} size={20} color={"white"} />
          }
          onOpen={() => setOpen(!open)}
          onClose={() => (!loading ? setOpen(!open) : null)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ActivityIndicator: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
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
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: "center",
  },
});
