import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { getData } from "../../DB/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chart() {
  const [day, setDay] = useState([]);
  const [dayDataList, setDayDataList] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        keys.sort();
        const weekKeys = keys.slice(-7);
        const result = await Promise.all(
          weekKeys.map((day) =>
            getData(day).then((value) => {
              setDayDataList((dayDataList) => [
                ...dayDataList,
                Number(value.thirdQuestion),
              ]);
            })
          )
        );

        // console.log(result);
        [...Array(7)].map((value, index) => {
          setDay((day) => [...day, weekKeys[index].slice(-5)]);
        });
        // weekKeys.map((value, index) => {
        //   setDayDataList((dayDataList) => [
        //     ...dayDataList,
        //     Number(result[index].thirdQuestion),
        //   ]);
        // });
      } catch (e) {
        console.log("error");
      }
    };
    init();
  }, []);

  useEffect(() => {
    // console.log(day);
    console.log(dayDataList);
  });

  return (
    <View>
      <Text>최지우님의 기분변화 그래프</Text>
      <LineChart
        data={{
          labels: [day[0], day[1], day[2], day[3], day[4], day[5], day[6]],
          datasets: [
            {
              data: [
                // 0, 0, 0, 0, 0, 0, 0,
                // console.log(dayDataList),
                dayDataList[0],
                dayDataList[1],
                dayDataList[2],
                dayDataList[3],
                dayDataList[4],
                dayDataList[5],
                dayDataList[6],
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
