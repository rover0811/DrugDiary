import { View, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SearchText() {
  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.search}
        placeholder="약의 정확한 이름을 입력해주세요"
        editable
      />
      <TouchableOpacity style={{ marginRight: 10 }}>
        <MaterialCommunityIcons name={"magnify"} size={20} />
      </TouchableOpacity>
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
    height: 40,
    width: "90%",
    padding: 10,
  },
});
