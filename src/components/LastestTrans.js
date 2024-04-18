import { FlashList } from "@shopify/flash-list";
import { View, Text, StyleSheet } from "react-native";
import TransferCard from "./TransferCard";
import { DATA } from "./TransferList";

const getLastThreeTransfers = () => {
  const lastIndex = DATA.length - 1;
  const lastThreeTransfers = DATA.slice(Math.max(lastIndex - 2, 0));
  return lastThreeTransfers.reverse();
};

const LastestTrans = () => {
  const lastThreeTransfers = getLastThreeTransfers();

  return (
    <View style={styles.transferListContainer}>
      <Text style={styles.h3}>Transacciones Recientes</Text>
      <View style={styles.flashListContainer}>
        <FlashList
          data={lastThreeTransfers}
          renderItem={({ item }) => <TransferCard {...item} />}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h3: {
    color: "#363636",
    fontSize: 25,
    marginTop: "5%",
    marginLeft: "5%",
    fontWeight: "bold",
  },
  transferListContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default LastestTrans;