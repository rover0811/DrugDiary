import React from "react";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import RNPickerSelect from "./StateSelector.js";
import { ScrollView } from "react-native-gesture-handler";
// import { storeData, getData } from "../DB/Store";

const InputText = () => {
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={{ alignContent: "center" }}>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={onChangeNumber}
        editable
      />
    </View>
  );
};

export function PlusModal({ openPlusModal, closePlusModal }) {
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
            <Text style={styles.textStyle}>오늘 하루를 기록해주세요.</Text>
          </Pressable>
          <DayModal
            openDayModal={dayModalVisible}
            closeDayModal={closeDayModalVisible}
          />
          <Pressable
            style={[styles.button, styles.selectButtonInPlus]}
            onPress={closePlusModal}
          >
            <Text style={styles.textStyle}>복약 정보를 확인해주세요.</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
export function DayModal({ openDayModal, closeDayModal }) {
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
                <View>
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      source={require("../../image/joy.png")}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    기쁨
                  </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      source={require("../../image/calm.png")}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    평온
                  </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      source={require("../../image/hard.png")}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    힘듦
                  </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      source={require("../../image/sad.png")}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    슬픔
                  </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      source={require("../../image/tired.png")}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    피곤
                  </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      source={require("../../image/angry.png")}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    화남
                  </Text>
                </View>
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
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                        margin: 3,
                        height: 50,
                        width: 50,
                      }}
                      source={require("../../image/eatyet.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={{
                        borderRadius: 100,
                        overflow: "hidden",
                        margin: 3,
                      }}
                      source={require("../../image/eat.png")}
                    />
                  </TouchableOpacity>
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
  selectButtonInPlus: {
    backgroundColor: "#1B4B66",
    width: "90%",
    height: "25%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  input: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    height: 100,
    borderRadius: 9,
    margin: "5%",
    marginTop: 0,
    marginBottom: 0,
  },
});

export default DayModal;
