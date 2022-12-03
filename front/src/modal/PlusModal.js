import React from "react";
import { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DayModal from "../modal/DayModal";
import { format } from "date-fns";

export default function PlusModal({ openPlusModal, closePlusModal }) {
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const closeDayModalVisible = () => {
    setDayModalVisible(false);
    closePlusModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openPlusModal}
      onRequestClose={() => {
        closePlusModal;
      }}
    >
      <TouchableOpacity style={styles.modalOutside} onPress={closePlusModal} />
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>등록 방법을 선택해 주세요.</Text>
        <TouchableOpacity
          style={[
            styles.button,
            styles.selectButtonInPlus,
            { marginTop: 20, marginBottom: 10 },
          ]}
          onPress={() => {
            setDayModalVisible(!dayModalVisible);
          }}
        >
          <Text style={styles.textStyleInPlus}>오늘 하루를 기록해주세요.</Text>
        </TouchableOpacity>
        <DayModal
          openDayModal={dayModalVisible}
          closeDayModal={closeDayModalVisible}
          selectedDate={format(new Date(), "yyyy-MM-dd")}
        />
        <TouchableOpacity
          style={[styles.button, styles.selectButtonInPlus]}
          onPress={closePlusModal}
        >
          <Text style={styles.textStyleInPlus}>복약 정보를 확인해주세요.</Text>
        </TouchableOpacity>
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
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 300,
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
  selectButtonInPlus: {
    backgroundColor: "#1B4B66",
    width: "90%",
    height: 65,
  },
  textStyleInPlus: {
    color: "white",
    fontSize: 17,
    // fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
