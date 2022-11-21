import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    // console.log("%s %s", key, value);
  } catch (e) {
    // saving error
  }
};
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    } else {
      console.log("is null!!");
    }
  } catch (e) {
    console.log("getitem err");
  }
  console.log("Done");
};
