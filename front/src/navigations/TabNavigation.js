import React from "react";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MonthlyCalendar } from "../screens/MonthlyCalendar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import PlusModal from "../modal/PlusModal";
import { TextInput } from "react-native-gesture-handler";

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
      <Tab.Screen
        name="History"
        component={EmptyScreen}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "history" }),
          tabBarActiveTintColor: "#1B4B66",
        }}
      />
      <Tab.Screen
        name={" "}
        component={EmptyScreen}
        options={{
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
        name="Add"
        component={Add}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "pill" }),
          tabBarActiveTintColor: "#1B4B66",
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "calendar-check" }),
          tabBarActiveTintColor: "#1B4B66",
        }}
      />
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
function Add() {
  return (
    <View style={{ height: "100%", backgroundColor: "white", padding: 18 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>최지우님,</Text>
      <Text style={{ fontSize: 20 }}>복용하고 있는 약을 추가해주세요</Text>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="약의 정확한 이름을 입력해주세요"
          style={{ marginLeft: 20 }}
        />
        <TouchableOpacity
          style={{ marginTop: 10, marginLeft: 100, marginBottom: 5 }}
        >
          <MaterialCommunityIcons name={"magnify"} size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 300,
        }}
      ></View>
      <View style={{ marginTop: 50 }}>
        <Button
          title="사진 촬영하기"
          color={"#1B4B66"}
          style={{ margin: 20 }}
        ></Button>
        <Button title="약 추가" color={"#1B4B66"}></Button>
        <Button title="약 바구니로 가기" color={"#1B4B66"}></Button>
      </View>
    </View>
  );
}
function Home() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

function Account() {
  return (
    <View>
      <Text>Account</Text>
    </View>
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
