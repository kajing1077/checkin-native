import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

type RewardItemProps = {
  todayAward: {
    cnt: number;
    icon: string;
    name: string;
  };
  gameName: string;
};

function gameNameChange(name: string) {
  switch (name) {
    case "genshin":
      return "원신";
    case "starrail":
      return "스타레일";
    case "zenless":
      return "젠레스 존 제로";
    default:
      break;
  }
}

function RewardItem({ todayAward, gameName }: RewardItemProps) {
  return (
    <View>
      <View style={styles.awardContainer}>
        <Text style={styles.awardTitle}>{gameNameChange(gameName)}</Text>
        <Image
          source={{ uri: todayAward.icon }}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Text>
          {todayAward.name}* {todayAward.cnt}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  awardContainer: {
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    width: 160,
    borderColor: colors.BLACK,
    padding: 20,
    margin: 10,
    gap: 5,
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RewardItem;
