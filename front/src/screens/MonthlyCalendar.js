import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { StyleSheet, Text, View } from "react-native";
import { LocaleConfig, Calendar } from "react-native-calendars";
import DayModal from "./Modal.js";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "fr";

export function CalendarView() {
  // const posts = [
  //   {
  //     id: 1,
  //     title: "제목입니다.",
  //     contents: "내용입니다.",
  //     date: "2022-02-26",
  //   },
  //   {
  //     id: 2,
  //     title: "제목입니다.",
  //     contents: "내용입니다.",
  //     date: "2022-02-27",
  //   },
  // ];
  // const markedDates = posts.reduce((acc, current) => {
  //   const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
  //   acc[formattedDate] = { marked: true };
  //   return acc;
  // }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const markedSelectedDates = {
    // ...markedDates,
    [selectedDate]: {
      selected: true,
      // marked: markedDates[selectedDate]?.marked,
    },
  };

  const [modalVisible, setModalVisible] = useState(false);
  const closeModalVisible = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Calendar
        style={styles.calendar}
        markedDates={markedSelectedDates}
        theme={{
          selectedDayBackgroundColor: "#1B4B66",
          arrowColor: "#1B4B66",
          dotColor: "#1B4B66",
          todayTextColor: "#1B4B66",
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
        enableSwipeMonths={true}
      />
      <DayModal openDayModal={modalVisible} closeDayModal={closeModalVisible} />
    </View>
  );
}

export const MonthlyCalendar = () => {
  // const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginTop: 50 }}>
      <View style={{ backgroundColor: "white", padding: 18 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>최지우님,</Text>
        <Text style={{ fontSize: 20 }}>
          오늘의 날짜를 눌러 기분을 입력해주세요
        </Text>
      </View>
      <CalendarView></CalendarView>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
