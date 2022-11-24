import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { getData } from "../../DB/Store";
import format from "date-fns/format";
import { ListItem } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chart({ selectedDate }) {
  // const [day, setDay] = useState([]);
  // const [dayDataList, setDayDataList] = useState([]);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const keys = await AsyncStorage.getAllKeys();
  //       keys.sort();
  //       const weekKeys = keys.slice(-7);
  //       const result = await Promise.all(
  //         weekKeys.map((day) =>
  //           getData(day).then((value) => {
  //             setDayDataList((dayDataList) => [
  //               ...dayDataList,
  //               Number(value.thirdQuestion),
  //             ]);
  //           })
  //         )
  //       );

  //       // console.log(result);
  //       [...Array(7)].map((value, index) => {
  //         setDay((day) => [...day, weekKeys[index].slice(-5)]);
  //       });
  //       // weekKeys.map((value, index) => {
  //       //   setDayDataList((dayDataList) => [
  //       //     ...dayDataList,
  //       //     Number(result[index].thirdQuestion),
  //       //   ]);
  //       // });
  //     } catch (e) {
  //       console.log("error");
  //     }
  //   };
  //   init();
  // }, []);
  const now = new Date();
  const day1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
  const day2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5);
  const day3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4);
  const day4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3);
  const day5 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
  const day6 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  const [day1Data, setday1Data] = useState(0);
  const [day2Data, setday2Data] = useState(0);
  const [day3Data, setday3Data] = useState(0);
  const [day4Data, setday4Data] = useState(0);
  const [day5Data, setday5Data] = useState(0);
  const [day6Data, setday6Data] = useState(0);

  useEffect(() => {
    // const init = async () => {
    //   try {
    //     const keys = await AsyncStorage.getAllKeys();
    //     const result = await Promise.all(keys.map((day) => getData(day)));

    //     setDayDataList(result);
    //   } catch (e) {
    //     // read key error
    //   }
    // };
    // init();
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
  }, [selectedDate]);

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

  // useEffect(() => {
  //   // console.log(day);
  //   console.log(dayDataList);
  // });

  return (
    <View>
      {/* <Text>기분변화 그래프</Text> */}
      <View style={{ backgroundColor: "white", padding: 18 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>최지우님,</Text> */}
        <Text style={{ fontSize: 20 }}>
          최지우님의 일주일동안 기분 변화입니다
        </Text>
      </View>
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
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => "#1B4B66",
          // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `#1B4B66`,
          // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          // style: {
          //   borderRadius: 16,
          // },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#1B4B66",
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        bezier
        // style={{
        //   marginVertical: 8,
        //   borderRadius: 16,
        // }}
      />
      {/* <View>
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
      </View> */}
    </View>
  );
}
