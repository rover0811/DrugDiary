import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";

const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const COLORS = {
  white: "#FFF",
  dark: "#000",
  primary: "#52c0b4",
  secondary: "#e0f4f1",
  light: "#f9f9f9",
  grey: "#908e8c",
  orange: "#f5a623",
};

const PillCard = ({ pills, onPress }) => {
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const Card = ({ pills, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        // disabled={activeCardIndex != index}
        // activeOpacity={0.5}
        onPress={() => {
          onPress(index);
        }}
      >
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <Image source={{ uri: pills?.itemImage }} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  {pills?.itemName}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Animated.FlatList
        onMomentumScrollEnd={(e) => {
          setActiveCardIndex(
            Math.round(e.nativeEvent.contentOffset.x / cardWidth)
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        data={pills}
        contentContainerStyle={{
          paddingVertical: 30,
          paddingLeft: 20,
          paddingRight: cardWidth / 2 - 40,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <Card pills={item} index={index} />}
        snapToInterval={cardWidth}
      />
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  cardDetails: {
    height: 80,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
});

export default PillCard;
