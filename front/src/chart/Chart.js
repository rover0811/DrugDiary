import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getData } from "../../DB/Store";

export default function Chart() {
  const now = new Date();
  const day1 = now.setDate(now.getDate() - 6);
  const day2 = now.setDate(now.getDate() + 1);
  const day3 = now.setDate(now.getDate() + 1);
  const day4 = now.setDate(now.getDate() + 1);
  const day5 = now.setDate(now.getDate() + 1);
  const day6 = now.setDate(now.getDate() + 1);
  const day7 = now.setDate(now.getDate() + 1);

  const [day1Data, setday1Data] = useState(0);
  const [day2Data, setday2Data] = useState(0);
  const [day3Data, setday3Data] = useState(0);
  const [day4Data, setday4Data] = useState(0);
  const [day5Data, setday5Data] = useState(0);
  const [day6Data, setday6Data] = useState(0);
  const [todayData, setTodayData] = useState(0);

  // useEffect(() => {
  getData(format(day1, "yyyy-MM-dd")).then((res) => {
    res.thirdQuestion ? setday1Data(res.thirdQuestion) : {};
  });
  getData(format(day2, "yyyy-MM-dd")).then((res) => {
    res.thirdQuestion ? setday2Data(res.thirdQuestion) : {};
  });
  getData(format(day3, "yyyy-MM-dd")).then((res) => {
    res.thirdQuestion ? setday3Data(res.thirdQuestion) : {};
  });
  getData(format(day4, "yyyy-MM-dd")).then((res) => {
    res.thirdQuestion ? setday4Data(res.thirdQuestion) : {};
  });
  getData(format(day5, "yyyy-MM-dd")).then((res) => {
    res.thirdQuestion ? setday5Data(res.thirdQuestion) : {};
  });
  getData(format(day6, "yyyy-MM-dd")).then((res) => {
    res.thirdQuestion ? setday6Data(res.thirdQuestion) : {};
  });
  getData(format(now, "yyyy-MM-dd")).then((res) => {
    res.thirdQuestion ? setTodayData(res.thirdQuestion) : {};
  });
  // });

  return (
    <View>
      <Text>최지우님의 기분변화 그래프</Text>
      <LineChart
        data={{
          labels: [
            format(day1, "MM/dd"),
            format(day2, "MM/dd"),
            format(day3, "MM/dd"),
            format(day4, "MM/dd"),
            format(day5, "MM/dd"),
            format(day6, "MM/dd"),
            format(now, "MM/dd"),
          ],
          datasets: [
            {
              data: [
                day1Data !== "Q3" ? day1Data : 0,
                day2Data !== "Q3" ? day2Data : 0,
                day4Data !== "Q3" ? day4Data : 0,
                day3Data !== "Q3" ? day3Data : 0,
                day5Data !== "Q3" ? day5Data : 0,
                day6Data !== "Q3" ? day6Data : 0,
                todayData !== "Q3" ? todayData : 0,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#1B4B66",
          backgroundGradientFrom: "#1B4B66",
          backgroundGradientTo: "#1B4B66",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#1B4B66",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
