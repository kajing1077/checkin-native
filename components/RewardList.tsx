import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RewardItem from "@/components/RewardItem";
import { DEFAULT_CONSTANTS } from "@/constants";

export type RewardListProps = {
  data: {
    genshin?: {
      isSign: boolean;
      todayAward: {
        cnt: number;
        icon: string;
        name: string;
      };
    };
    honkai?: {
      isSign: boolean;
      todayAward: {
        cnt: number;
        icon: string;
        name: string;
      };
    };
    starrail?: {
      isSign: boolean;
      todayAward: {
        cnt: number;
        icon: string;
        name: string;
      };
    };
    zenless?: {
      isSign: boolean;
      todayAward: {
        cnt: number;
        icon: string;
        name: string;
      };
    };
  };
};

function RewardList({ data }: RewardListProps) {
  const awards = Object.entries(data).filter(
    ([_, game]) => game && game.todayAward
  ) as [
    keyof typeof DEFAULT_CONSTANTS,
    {
      isSign: boolean;
      todayAward: { cnt: number; icon: string; name: string };
    }
  ][];

  return (
    <>
      <FlatList
        data={awards}
        renderItem={({ item: [gameName, game] }) => (
          <View style={styles.itemContainer}>
            <RewardItem
              todayAward={game.todayAward}
              gameName={DEFAULT_CONSTANTS[gameName].game}
            />
            <Text
              style={[
                styles.signStatus,
                game.isSign ? styles.signedText : styles.unsignedText,
              ]}
            >
              {game.isSign
                ? DEFAULT_CONSTANTS[gameName].signedMessage
                : DEFAULT_CONSTANTS[gameName].successMessage}
            </Text>
          </View>
        )}
        keyExtractor={([gameName]) => gameName}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  signStatus: {
    marginTop: 4,
    fontWeight: "bold",
  },
  signedText: {
    color: "#4CAF50",
  },
  unsignedText: {
    color: "#F44336",
  },
});

export default RewardList;
