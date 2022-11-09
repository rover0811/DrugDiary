import React from "react";
import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
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
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { height: "30%" }]}>
          <View>
            <Text style={styles.modalTitle}>등록 방법을 선택해 주세요.</Text>
          </View>
          <Pressable
            style={[
              styles.button,
              styles.selectButtonInPlus,
              { marginTop: 20, marginBottom: 10 },
            ]}
            onPress={() => {
              setDayModalVisible(!dayModalVisible);
            }}
          >
            <Text style={styles.textStyleInPlus}>
              오늘 하루를 기록해주세요.
            </Text>
          </Pressable>
          <DayModal
            openDayModal={dayModalVisible}
            closeDayModal={closeDayModalVisible}
            selectedDate={format(new Date(), "yyyy-MM-dd")}
          />
          <Pressable
            style={[styles.button, styles.selectButtonInPlus]}
            onPress={closePlusModal}
          >
            <Text style={styles.textStyleInPlus}>
              복약 정보를 확인해주세요.
            </Text>
          </Pressable>
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
  selectButtonInPlus: {
    backgroundColor: "#1B4B66",
    width: "90%",
    height: "25%",
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
