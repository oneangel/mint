import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TransferCardE from "./TransferCardE";

const TransferList = ({ data, toggleModal, toggleModalUp, setItem }) => {

  return (
    <View style={styles.transferListContainer}>
      <FlashList
        data={data}
        renderItem={({ item }) => <TransferCardE toggleModal={toggleModal} toggleModalUp={toggleModalUp} item={item} setItem={setItem} />}
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