import React from "react";
import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Switch } from "react-native";
import StateSelector from "../selector/StateSelector";
import { ScrollView } from "react-native-gesture-handler";
import InputText from "../input/InputText.js";
import EmotionButton from "../imagebutton/EmotionButton";
import EatPill from "../imagebutton/PillButton";
import { storeData, getData } from "../../DB/Store";
import { setDate } from "date-fns";

export default function DayModal({
  openDayModal,
  closeDayModal,
  selectedDate,
}) {
  class DateObj {
    constructor(
      selectedDate,
      iconFeeling,
      sleepTime,
      didFeelingChange,
      didTakeMedicine,
      firstQuestion,
      secondQuestion,
      thirdQuestion
    ) {
      this.createdDate = selectedDate;
      this.iconFeeling = iconFeeling;
      this.sleepTime = sleepTime;
      this.didFeelingChange = didFeelingChange;
      this.didTakeMedicine = didTakeMedicine;
      this.firstQuestion = firstQuestion;
      this.secondQuestion = secondQuestion;
      this.thirdQuestion = thirdQuestion;
    }
  }

  // switch 부분 state
  const [isChangeMood, setIsChangeMood] = useState(false);
  const toggleSwitch = () => setIsChangeMood((previousState) => !previousState);

  // emotion 버튼 부분 state
  const [isPressEmotion, setIsPressEmotion] = useState(false);
  const [todayEmotion, setTodayEmotion] = useState("");
  const emotionList = ["joy", "calm", "hard", "sad", "tired", "angry"];
  const handlePressEmotion = (emotionIdx) => {
    const newEmotionList = Array(emotionList.length).fill(false);
    newEmotionList[emotionIdx] = true;
    setIsPressEmotion(newEmotionList);
    setTodayEmotion(emotionList[emotionIdx]);
  };

  // input부분 state
  const [firstChangeText, setFirstChangeText] = useState("");
  const isFirstChanged = (text) => {
    setFirstChangeText(text);
  };

  const [secondChangeText, setSecondChangeText] = useState("");
  const isSecondChanged = (text) => {
    setSecondChangeText(text);
  };

  const [thirdChangeText, setThirdChangeText] = useState();
  const isThirdChanged = (number) => {
    setThirdChangeText(number);
  };

  // 약 복용 state
  const [isPill, setIsPill] = useState(false);
  const isClickPill = (isClick) => {
    setIsPill(isClick);
  };

  // 저장 버튼 클릭 시
  const storeAndCloseModal = () => {
    closeDayModal();
    const newEmotionList = Array(emotionList.length).fill(false);
    setIsPressEmotion(newEmotionList);

    // modal에서 받아온 값 저장
    storeData(
      selectedDate,
      new DateObj(
        selectedDate,
        todayEmotion,
        "안녕",
        isChangeMood,
        isPill,
        firstChangeText,
        secondChangeText,
        thirdChangeText
      )
    );
    getData(selectedDate);
  };
  // const [dayModalVisible, setDayModalVisible] = useState(props.dayModal);
  // getData(selectedDate);

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
                <EmotionButton
                  emotion={"joy"}
                  emotionIdx={"0"}
                  isSelected={isPressEmotion[0]}
                  handleClick={handlePressEmotion}
                />
                <EmotionButton
                  emotion={"calm"}
                  emotionIdx={"1"}
                  isSelected={isPressEmotion[1]}
                  handleClick={handlePressEmotion}
                />
                <EmotionButton
                  emotion={"hard"}
                  emotionIdx={"2"}
                  isSelected={isPressEmotion[2]}
                  handleClick={handlePressEmotion}
                />
                <EmotionButton
                  emotion={"sad"}
                  emotionIdx={"3"}
                  isSelected={isPressEmotion[3]}
                  handleClick={handlePressEmotion}
                />
                <EmotionButton
                  emotion={"tired"}
                  emotionIdx={"4"}
                  isSelected={isPressEmotion[4]}
                  handleClick={handlePressEmotion}
                />
                <EmotionButton
                  emotion={"angry"}
                  emotionIdx={"5"}
                  isSelected={isPressEmotion[5]}
                  handleClick={handlePressEmotion}
                />
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
                  <EatPill eat={"eatyet"} handleClick={isClickPill} />
                  <EatPill eat={"eatalready"} handleClick={isClickPill} />
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
                value={isChangeMood}
                style={{ margin: 5 }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
                오늘의 질문
              </Text>
              <InputText isChanged={isFirstChanged} questionIdx={"0"} />
              <InputText isChanged={isSecondChanged} questionIdx={"1"} />
              <StateSelector isChanged={isThirdChanged} />
            </View>
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
            onPress={storeAndCloseModal}
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
