import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getData } from "../../DB/Store";

export default function Chart() {
  const now = new Date();
  const day1 = new Date(now.setDate(now.getDate() - 6));
  const day2 = new Date(now.setDate(now.getDate() + 1));
  const day3 = new Date(now.setDate(now.getDate() + 1));
  const day4 = new Date(now.setDate(now.getDate() + 1));
  const day5 = new Date(now.setDate(now.getDate() + 1));
  const day6 = new Date();

  const [day1Data, setday1Data] = useState(0);
  const [day2Data, setday2Data] = useState(0);
  const [day3Data, setday3Data] = useState(0);
  const [day4Data, setday4Data] = useState(0);
  const [day5Data, setday5Data] = useState(0);
  const [day6Data, setday6Data] = useState(0);

  useEffect(() => {
    getData(format(day1, "yyyy-MM-dd")).then((res) => {
      setday1Data(res.thirdQuestion);
    });
    getData(format(day2, "yyyy-MM-dd")).then((res) => {
      setday2Data(res.thirdQuestion);
    });
    getData(format(day3, "yyyy-MM-dd")).then((res) => {
      setday3Data(res.thirdQuestion);
    });
    getData(format(day4, "yyyy-MM-dd")).then((res) => {
      setday4Data(res.thirdQuestion);
    });
    getData(format(day5, "yyyy-MM-dd")).then((res) => {
      setday5Data(res.thirdQuestion);
    });
    getData(format(day6, "yyyy-MM-dd")).then((res) => {
      setday6Data(res.thirdQuestion);
    });
  }, [now]);

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
          ],
          datasets: [
            {
              data: [
                day1Data ? day1Data : 0,
                day2Data ? day2Data : 0,
                day3Data ? day3Data : 0,
                day4Data ? day4Data : 0,
                day5Data ? day5Data : 0,
                day6Data ? day6Data : 0,
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
