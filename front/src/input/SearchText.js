import { View, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import PillCard from "../addview/PillCard";
import { getAllKeys, getData, setAsyncPills } from "../../DB/Store";

export default function SearchText({ pills }) {
  const [searchPillsList, setSearchPillsList] = useState([]);
  const [searchPill, setSearchPill] = useState(false);

  const getPills = async () => {
    try {
      const api = axios.create({ baseURL: "http://52.78.57.119" });
      await api
        .get("/pill/input_name", {
          params: {
            name: changeText,
          },
        })
        .then((res) => {
          if (res.data.items) {
            res.data.items.map((value) => {
              searchPillsList.push(value);
            });
            setSearchPill(false);
          } else {
            alert("약 정보가 없습니다\n 다시 입력해주세요");
            setSearchPill(false);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("다시 입력해주세요");
          setSearchPill(false);
        });
    } catch (e) {
      alert("다시 입력해주세요");
      setSearchPill(false);
    }
  };
  const [changeText, setChangeText] = useState();

  const handleClickPillIndex = (pillIndex) => {
    pills.push(searchPillsList[pillIndex]);
    setAsyncPills(searchPillsList[pillIndex]);
    setSearchPillsList();
    setSearchPill(false);
  };

  return (
    <View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.search}
          placeholder="약의 정확한 이름을 입력해주세요"
          onChangeText={(text) => {
            setSearchPillsList([]);
            setChangeText(text);
            setSearchPill(false);
          }}
          onSubmitEditing={() => {
            getPills();
            setSearchPill(true);
          }}
          returnKeyType="search"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
          editable
        />
        {!searchPill ? (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              getPills();
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
