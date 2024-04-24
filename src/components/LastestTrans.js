import { FlashList } from "@shopify/flash-list";
import { View, Text, StyleSheet } from "react-native";
import TransferCard from "./TransferCard";

const LastestTrans = ({ data }) => {

  return (
    <View style={styles.transferListContainer}>
      <View style={styles.row}>
        <Text style={styles.h3}>Transacciones Recientes</Text>
        <Text style={styles.h3}>Ver todos</Text>
      </View>

      <View style={styles.flashListContainer}>
        <FlashList
          data={data}
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
    fontSize: 16,
    marginTop: "5%",
    marginLeft: "5%",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  transferListContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  flashListContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 15,
    flex: 1,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Esto es para Android
  },
});

export default LastestTrans;
