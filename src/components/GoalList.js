import { FlashList } from "@shopify/flash-list";
import {
  View,
  StyleSheet,
} from "react-native";
import GoalCard from "./GoalCard";

const GoalList = ({ data, setItem }) => {
  return (
    <View style={styles.transferListContainer}>

      <View style={styles.flashListContainer}>
        <FlashList
          data={data}
          renderItem={({ item }) => <GoalCard item={item} setItem={setItem} />}
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
    fontWeight: "bold",
  },
  transferListContainer: {
    flex: 1,
    justifyContent: "flex-start",
    minHeight: "100%",
  },
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#3E70A1",
    borderRadius: 25,
    padding: 8
    ,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginLeft: 10,
    top: 10,
  },
});

export default GoalList;
