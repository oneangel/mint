import { FlashList } from "@shopify/flash-list";
import { View, Text, StyleSheet } from "react-native";
import TransferCardE from "./TransferCardE";

export const DATA = [
    {
      id: 1,
      type: "ingreso",
      description: "Chuy",
      date: "2022-10-01",
      amount: "100",
    },
    {
      id: 2,
      description: "Gym",
      date: "2022-10-01",
      amount: "400",
      type: "gasto",
    },
    {
      id: 3,
      description: "Chuy",
      date: "2022-10-01",
      amount: "100",
      type: "ingreso",
    },
    {
      id: 4,
      description: "Gym",
      date: "2022-10-01",
      amount: "400",
      type: "gasto",
    },
    {
      id: 5,
      description: "Chuy",
      date: "2022-10-01",
      amount: "100",
      type: "ingreso",
    },
    {
      id: 6,
      description: "Gym",
      date: "2022-10-01",
      amount: "400",
      type: "gasto",
    },
  ];
  
  
const TransferList = () => {
  return (
    <View style={styles.transferListContainer}>
      <Text style={styles.h3}>Trasnferencias</Text>
      <View style={styles.flashListContainer}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => <TransferCardE {...item} />}
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
  
  export default TransferList;
  
