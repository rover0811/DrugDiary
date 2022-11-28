import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchText from "../input/SearchText";

export default function SearchModal({ openDayModal, closeDayModal, pills }) {
  // const [dayModalVisible, setDayModalVisible] = useState(props.dayModal);
  // getData(selectedDate);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openDayModal}
      onRequestClose={() => {
        closeDayModal(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { height: "60%" }]}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                closeDayModal(false);
              }}
            >
              <MaterialCommunityIcons name="chevron-left" size={30} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>약 검색</Text>
          </View>
          <SearchText pills={pills} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
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
  modalBackground: {
    backgroundColor: "#EFEFF0",
    borderRadius: 16,
    margin: 0,
    marginBottom: 10,
    width: "90%",
  },
  modalBox: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 16,
  },
  modalHalfBox: {
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 16,
    width: "45%",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
});
