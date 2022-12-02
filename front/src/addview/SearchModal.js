import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchText from "../input/SearchText";

export default function SearchModal({
  openSearchModal,
  closeSearchModal,
  pills,
}) {
  // const [dayModalVisible, setDayModalVisible] = useState(props.dayModal);
  // getData(selectedDate);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openSearchModal}
      onRequestClose={() => {
        closeSearchModal(false);
      }}
    >
      <TouchableOpacity
        style={styles.modalOutside}
        onPress={closeSearchModal}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => closeSearchModal(false)}
      ></TouchableOpacity>
      <View style={[styles.modalView, { height: "60%" }]}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              closeSearchModal(false);
            }}
          >
            <MaterialCommunityIcons name="chevron-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>약 검색</Text>
        </View>
        <SearchText pills={pills} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOutside: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 0,
    paddingTop: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#1B4B66",
    width: 129,
    height: 44,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
