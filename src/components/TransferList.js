import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TransferCardE from "./TransferCardE";

export const DATA = [
  { id: 1, type: "ingreso", description: "Chuy", date: "2022-10-01", amount: "100" },
  { id: 2, description: "Gym", date: "2022-10-01", amount: "400", type: "gasto" },
  { id: 3, description: "Chuy", date: "2022-10-01", amount: "100", type: "ingreso" },
  { id: 4, description: "Gym", date: "2022-10-01", amount: "400", type: "gasto" },
  { id: 5, description: "Chuy", date: "2022-10-01", amount: "100", type: "ingreso" },
  { id: 6, description: "Gym", date: "2022-10-01", amount: "400", type: "gasto" },
  { id: 7, description: "Chuy", date: "2022-10-01", amount: "100", type: "ingreso" },
  { id: 8, description: "Chuy", date: "2022-10-01", amount: "100", type: "ingreso" },
  { id: 9, description: "Chuy", date: "2022-10-01", amount: "100", type: "ingreso" },
  { id: 10, description: "Chuy", date: "2022-10-01", amount: "100", type: "ingreso" },
];

const TransferList = () => {
  return (
    <View style={styles.transferListContainer}>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <TransferCardE {...item} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  h3: {
    color: "#363636",
    fontSize: 25,
    fontWeight: "bold",
  },
  transferListContainer: {
    flex: 1,
    justifyContent: "flex-start",
    height: 300, 
  },
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    maxHeight: 400,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 25,
    padding: 5,
  },
});

export default TransferList;