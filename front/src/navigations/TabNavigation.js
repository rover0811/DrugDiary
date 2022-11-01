import React from "react";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MonthlyCalendar } from "../screens/MonthlyCalendar";
// import { Home } from "../screens/Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar, Agenda } from "react-native-calendars";
import { NavigationContainer } from "@react-navigation/native";
const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

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
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View>
                        <Text style={styles.modalTitle}>
                          등록 방법을 선택해 주세요.
                        </Text>
                      </View>

                      <Pressable
                        style={[
                          styles.button,
                          styles.buttonClose,
                          { marginTop: 20, marginBottom: 10 },
                        ]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>
                          오늘 하루를 기록해주세요.
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>
                          복약 정보를 확인해주세요.
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Add"
        component={EmptyScreen}
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
function Home() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log("%s %s", key, value);
  } catch (e) {
    // saving error
  }
};
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
    console.log("%s %s", key, value);
  } catch (e) {
    // error reading value
  }
};

function Account() {
  return (
    <View>
      <Button
        title="Press"
        onPress={() => storeData("testing", "hello")}
      ></Button>
      <Button title="Show" onPress={() => getData("testing")}></Button>
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
