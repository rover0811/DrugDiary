import React from "react";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MonthlyCalendar } from "../screens/MonthlyCalendar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import PlusModal from "../modal/PlusModal";
import AddView from "../addview/AddView";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Chart from "../chart/Chart";
import { initPillsList } from "../../DB/Store";

const screenWidth = Dimensions.get("window").width;

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModalVisible = () => {
    setModalVisible(false);
  };
  const navigation = useNavigation();
  initPillsList();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MonthlyCalendar}
        options={{
          headerShown: false,
          tabBarIcon: (props) => TabIcon({ ...props, name: "home" }),
          tabBarActiveTintColor: "#1B4B66",
        }}
      />
      {/* <Tab.Screen
        name="History"
        component={Chart}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "history" }),
          tabBarActiveTintColor: "#1B4B66",
        }}
      /> */}
      <Tab.Screen
        name={" "}
        component={MonthlyCalendar}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: "#1B4B66",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    // marginBottom: Platform.OS == "android" ? 50 : 30,
                    marginBottom: Platform.OS == "android" ? 20 : 10,
                  }}
                >
                  <Image
                    source={require("../../image/plus.png")}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>
                </View>
              </TouchableOpacity>
              <PlusModal
                openPlusModal={modalVisible}
                closePlusModal={closeModalVisible}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Pill"
        component={AddView}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "pill" }),
          tabBarActiveTintColor: "#1B4B66",
          headerShown: false,

        }}
      />
      {/* <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "calendar-check" }),
          tabBarActiveTintColor: "#1B4B66",
        }}
      /> */}
    </Tab.Navigator>
  );
};

function EmptyScreen() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
// function Add() {
//   return <AddView />;
// }
function Home() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

function Account() {
  return <HomeScreen></HomeScreen>;
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
    height: "30%",
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
    width: "90%",
    height: "25%",
  },
  textStyle: {
    color: "white",
    fontSize: 17,
    // fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TabNavigation;
