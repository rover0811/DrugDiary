import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { StyleSheet, Text, View } from "react-native";
import { LocaleConfig, Calendar } from "react-native-calendars";
import DayModal from "../modal/DayModal";

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
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const markedSelectedDates = {
    [selectedDate]: {
      selected: true,
    },
  };

  const [modalVisible, setModalVisible] = useState(false);
  const closeDayModal = () => {
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
      <DayModal
        openDayModal={modalVisible}
        closeDayModal={closeDayModal}
        selectedDate={selectedDate}
      />
    </View>
  );
}

export const MonthlyCalendar = () => {
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
