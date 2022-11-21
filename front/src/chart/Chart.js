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

  const [dayDataList, setDayDataList] = useState(
    // [...Array(7)].map(
    //   (value, index) => new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - index))
    //   )
    []
  );

  const list = [
    {
      title: "기존 기록 보기",
      icon: "av-timer",
    },
    {
      title: "약 목록 보기",
      icon: "pill",
    },
  ];

  // uri;
  // const response = await fetch(uri);
  // const blob  = await response.blob();// 이미지 올리는 부분

  useEffect(() => {
    // console.log(day);
    console.log(dayDataList);
  });

  return (
    <View>
      <Text>기분변화 그래프</Text>
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
      <View>
        <Text style={{ fontSize: 40 }}>약 목록</Text>
        <ListItem
          bottomDivider
          onPress={async () => {
            let keys = [];
            try {
              keys = await AsyncStorage.getAllKeys();
            } catch (e) {
              // read key error
            }

            console.log(keys);
            // example console.log result:
            // ['@MyApp_user', '@MyApp_key']
          }}
        >
          <MaterialCommunityIcons name="history" size={20} />
          <ListItem.Content>
            <ListItem.Title>최근 기록들 보기</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={() => alert("hello")}>
          <MaterialCommunityIcons name="pill" size={20} />
          <ListItem.Content>
            <ListItem.Title>복용하고 있는 약 보기</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </View>
  );
}
