import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image } from "react-native";

export default function EatPill({ eat, handleClick }) {
  const IsPill = {
    eatalready: {
      picturesource: require("../../image/eat.png"),
    },
    eatyet: {
      picturesource: require("../../image/eatyet.png"),
    },
  };

  return (
    <TouchableOpacity
      onPress={() =>
        eat === "eatalready" ? handleClick(true) : handleClick(false)
      }
    >
      <Image
        style={{
          borderRadius: 100,
          overflow: "hidden",
          margin: 3,
          height: 50,
          width: 50,
        }}
        source={IsPill[eat].picturesource}
      />
    </TouchableOpacity>
  );
}
