import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue); // 혹시 안되면 setItem으로 바꾼다.
    console.log("%s", jsonValue);
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

export const setPills = async (pills) => {
  try {
    getData("pillsList")
      .then((res) => {
        // res.push((Array.isArray(pills))? (...pills): pills);
        if (Array.isArray(pills)) res.push(...pills);
        else res.push(pills);
        storeData("pillsList", res);
      })
      .catch((e) => {
        console.log(e);
      }); // 여기서 pills 목록을 불러옴
    // value.push(pills)
    // pills.map((name) => itemName=name.itemName)
  } catch (e) {
    console.log(e);
  }
  console.log("Done");
};

export const getAllKeys = async () => {
  //Asyncstorage의 key들의 배열을 리턴
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    return keys;
  } catch (e) {}

  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};
