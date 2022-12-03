import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deletePill } from "../../DB/Store";

export default function DeleteModal({
  itemName,
  deleteModalVisible,
  closeDeleteModal,
  pills,
  handleSetPills,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={deleteModalVisible}
      onRequestClose={() => {
        closeDeleteModal(false);
      }}
    >
      <View style={styles.centerView}>
        <TouchableOpacity
          style={styles.modalOutside}
          onPress={closeDeleteModal}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => closeSearchModal(false)}
        ></TouchableOpacity>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {itemName}을 삭제하시겠습니까?
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-between",
              position: "absolute",
              bottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                closeDeleteModal();
                deletePill(itemName);
                handleSetPills(
                  pills.filter((value) => value.itemName !== itemName)
                );
                // console.log(pills);
              }}
              style={styles.modalBtn}
            >
              <Text style={{ fontSize: 20, color: "white" }}>예</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeDeleteModal}
              style={[styles.modalBtn, { backgroundColor: "lightgray" }]}
            >
              <Text style={{ fontSize: 20, color: "#1B4B66" }}>아니오</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    alignItems: "center",
    // justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 25,
    // paddingTop: 30,
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
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
  modalBtn: {
    backgroundColor: "#1B4B66",
    width: "40%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
});
