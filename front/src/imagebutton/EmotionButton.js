import React from "react";
import { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

export default function EmotionButton({ emotion }) {
  const [selectImageButton, setSelectImageButton] = useState();
  const EMOTION_DATA = {
    joy: {
      picturesource: require("../../image/joy.png"),
      text: "기쁨",
    },
    calm: {
      picturesource: require("../../image/calm.png"),
      text: "평온",
    },
    hard: {
      picturesource: require("../../image/hard.png"),
      text: "힘듦",
    },
    sad: {
      picturesource: require("../../image/sad.png"),
      text: "슬픔",
    },
    tired: {
      picturesource: require("../../image/tired.png"),
      text: "피곤",
    },
    angry: {
      picturesource: require("../../image/angry.png"),
      text: "화남",
    },
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setSelectImageButton(emotion);
        }}
      >
        <Image
          style={{
            borderRadius: 100,
            overflow: "hidden",
          }}
          source={EMOTION_DATA[emotion].picturesource}
        />
      </TouchableOpacity>
      <Text style={{ textAlign: "center", marginTop: 5 }}>
        {EMOTION_DATA[emotion].text}
      </Text>
    </View>
  );
}
