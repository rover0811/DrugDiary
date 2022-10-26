import Modal from "react-native-modal";
import React, { Component, useState } from "react";
import { StyleSheet, View } from "react-native";

class DayModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
          presentationStyle={"pageSheet"}
        ></Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DayModal;
