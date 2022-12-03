import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import StateSelector from "../selector/StateSelector";
import { ScrollView } from "react-native-gesture-handler";
import InputText from "../input/InputText.js";
import EmotionButton from "../imagebutton/EmotionButton";
import EatPill from "../imagebutton/PillButton";
import { getData, storeData } from "../../DB/Store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DayModal({
  openDayModal,
  closeDayModal,
  selectedDate,
  getDayData,
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

  const [todayFirstQuestion, setTodayFirstQuestion] = useState();
  const handleSetFirstQuestion = (res) => {
    setTodayFirstQuestion(res);
  };

  const [todaySecondQuestion, setTodaySecondQuestion] = useState();
  const handleSetSecondQuestion = (res) => {
    setTodaySecondQuestion(res);
  };

  const [todayThirdQuestion, setTodayThirdQuestion] = useState();
  const handleSetThirdQuestion = (res) => {
    setTodayThirdQuestion(res);
  };

  // input부분 state
  const [firstChangeText, setFirstChangeText] = useState("");
  const handleFirstChanged = (text) => {
    setFirstChangeText(text);
  };

  const [secondChangeText, setSecondChangeText] = useState("");
  const handleSecondChanged = (text) => {
    setSecondChangeText(text);
  };

  const [thirdChangeText, setThirdChangeText] = useState(0);
  const handleThirdChanged = (number) => {
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
  };

  const closeModal = () => {
    closeDayModal();
  };
  // const [dayModalVisible, setDayModalVisible] = useState(props.dayModal);
  // getData(selectedDate);

  useEffect(() => {
    const init = () => {
      try {
        handlePressEmotion(emotionList.indexOf(getDayData?.iconFeeling));
        handleSetFirstQuestion(getDayData?.firstQuestion);
        handleSetSecondQuestion(getDayData?.secondQuestion);
        handleSetThirdQuestion(getDayData?.thirdQuestion);
      } catch (e) {
        console.log("error");
      }
    };
    init();
  }, [openDayModal]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openDayModal}
      onRequestClose={() => {
        setDayModalVisible(!dayModalVisible);
      }}
    >
      <TouchableOpacity style={styles.modalOutside} onPress={closeDayModal} />
      <View style={[styles.modalView, { height: "92%" }]}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={closeModal} style={{}}>
            <MaterialCommunityIcons name="chevron-left" size={30} />
          </TouchableOpacity>
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
            <InputText
              data={todayFirstQuestion}
              onChanged={handleFirstChanged}
              questionIdx={"0"}
            />
            <InputText
              data={todaySecondQuestion}
              onChanged={handleSecondChanged}
              questionIdx={"1"}
            />
            <StateSelector
              isChanged={handleThirdChanged}
              data={todayThirdQuestion}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
          onPress={storeAndCloseModal}
        >
          <Text style={styles.textStyle}>저장</Text>
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
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
