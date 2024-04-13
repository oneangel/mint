import { FlashList } from "@shopify/flash-list";
import { View, Text, StyleSheet } from "react-native";
import TransferCard from "./TransferCard";
import { DATA } from "./TransferList";

// Función para obtener las últimas tres transferencias
const getLastThreeTransfers = () => {
  const lastIndex = DATA.length - 1;
  const lastThreeTransfers = DATA.slice(Math.max(lastIndex - 2, 0)); // Obtener las últimas tres transferencias o menos si hay menos de tres
  return lastThreeTransfers.reverse(); // Invertir el orden para mostrar las últimas primero
};

const LastestTrans = () => {
  const lastThreeTransfers = getLastThreeTransfers(); // Obtener las últimas tres transferencias

  return (
    <View style={styles.transferListContainer}>
      <Text style={styles.h3}>Últimas transferencias</Text>
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
