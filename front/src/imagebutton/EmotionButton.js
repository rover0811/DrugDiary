import React from "react";
import { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

export default function EmotionButton({
  emotion,
  isSelected,
  handleClick,
  emotionIdx,
}) {
  const [selectImageButton, setSelectImageButton] = useState();
  const EMOTION_DATA = {
    joy: {
      picturesource: isSelected
        ? require("../../image/joy.png")
        : require("../../image/joy_gray.png"),
      text: "기쁨",
    },
    calm: {
      picturesource: isSelected
        ? require("../../image/calm.png")
        : require("../../image/calm_gray.png"),
      text: "평온",
    },
    hard: {
      picturesource: isSelected
        ? require("../../image/hard.png")
        : require("../../image/hard_gray.png"),
      text: "힘듦",
    },
    sad: {
      picturesource: isSelected
        ? require("../../image/sad.png")
        : require("../../image/sad_gray.png"),
      text: "슬픔",
    },
    tired: {
      picturesource: isSelected
        ? require("../../image/tired.png")
        : require("../../image/tired_gray.png"),
      text: "피곤",
    },
    angry: {
      picturesource: isSelected
        ? require("../../image/angry.png")
        : require("../../image/angry_gray.png"),
      text: "화남",
    },
  };
  return (
    <View>
      <TouchableOpacity onPress={() => handleClick(emotionIdx)}>
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
