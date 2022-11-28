import { View, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import PillCard from "../addview/PillCard";
import { getAllKeys, getData, setPills } from "../../DB/Store";

export default function SearchText({ pills }) {
  const searchPillsList = [];
  const [searchPill, setSearchPill] = useState(false);

  const getPills = async () => {
    // console.log("getPills 들어옴");
    try {
      // console.log("try 들어옴");
      const api = axios.create({ baseURL: "http://52.78.57.119" });
      await api
        .get("/pill/input_name", {
          params: {
            name: changeText,
          },
        })
        .then((res) => {
          if (res.data.items) {
            // searchPillsList.push(res.data.items);
            res.data.items.map((value, index) => {
              searchPillsList.push(res.data.items[index]);
              setSearchPill(false);
              console.log(searchPillsList);
            });
          } else {
            alert("약 정보가 없습니다\n 다시 입력해주세요");
            // setSearchPill(false);
          }
        })
        .catch((e) => {
          // alert("조금 더 구체적으로 입력해주세요")
        });
      // console.log("데이터 잘 불러옴!!");
    } catch (e) {
      // alert("약 정보가 없습니다\n 다시 입력해주세요");
      setSearchPill(false);
    }
  };
  const [changeText, setChangeText] = useState();
  useEffect(() => {
    getPills();
  }, [searchPill]);

  const [clickPillIndex, setClickPillIndex] = useState();
  const handleClickPillIndex = (pillIndex) => {
    setClickPillIndex(pillIndex);
    // pills.push(searchPillsList[pillIndex]);
    setPills(searchPillsList[pillIndex]);
    setSearchPill(false);
  };

  // getData("pillsList")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.search}
          placeholder="약의 정확한 이름을 입력해주세요"
          onChangeText={(text) => {
            setChangeText(text);
          }}
          editable
        />
        {!searchPill ? (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              setSearchPill(!searchPill);
            }}
          >
            <MaterialCommunityIcons name={"magnify"} size={25} />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator style={{ marginRight: 10 }} />
        )}
      </View>
      <PillCard pills={searchPillsList} onPress={handleClickPillIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    height: 50,
    width: "85%",
    padding: 10,
    fontSize: 17,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
