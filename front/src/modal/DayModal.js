import React from "react";
import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Switch } from "react-native";
import RNPickerSelect from "../selector/StateSelector";
import { ScrollView } from "react-native-gesture-handler";
import InputText from "../input/InputText.js";
import EmotionButton from "../imagebutton/EmotionButton";
import EatPill from "../imagebutton/PillButton";

export default function DayModal({ openDayModal, closeDayModal }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const [dayModalVisible, setDayModalVisible] = useState(props.dayModal);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openDayModal}
      onRequestClose={() => {
        setDayModalVisible(!dayModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { height: "92%" }]}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.modalTitle}>하루 기록</Text>
          </View>
          <ScrollView style={styles.modalBackground}>
            <View style={[styles.modalBox, { marginBottom: 0 }]}>
              <Text style={styles.modalText}>기분을 선택해줘</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <EmotionButton emotion={"joy"} />
                <EmotionButton emotion={"calm"} />
                <EmotionButton emotion={"hard"} />
                <EmotionButton emotion={"sad"} />
                <EmotionButton emotion={"tired"} />
                <EmotionButton emotion={"angry"} />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 0,
              }}
            >
              <View style={[styles.modalHalfBox, { marginBottom: 0 }]}>
                <Text style={styles.modalText}>어제 수면 시간</Text>
              </View>
              <View style={[styles.modalHalfBox, { marginBottom: 0 }]}>
                <Text style={[styles.modalText, { marginBottom: 0 }]}>
                  약 복용
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <EatPill eat={"eatyet"} />
                  <EatPill eat={"eatalready"} />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.modalBox,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.modalText}>
                하루 동안 유의미한 감정 기복이 있었어?
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#1B4B66" }}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ margin: 5 }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
                오늘의 질문
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "bold", margin: 10 }}>
                1. 약을 먹고 불편한 점이 있었다면 자세히 알려줘
              </Text>
              <InputText />
              <Text style={{ fontSize: 13, fontWeight: "bold", margin: 10 }}>
                2. 특별한 생활 사건들에 대해 자세히 알려줘
              </Text>
              <InputText />
              <Text style={{ fontSize: 13, fontWeight: "bold", margin: 10 }}>
                3. 오늘 하루를 떠올리고 아래 표에서 어울리는 나의 상태를 골라줘
              </Text>
              <RNPickerSelect />
            </View>
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
            onPress={closeDayModal}
          >
            <Text style={styles.textStyle}>저장</Text>
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
