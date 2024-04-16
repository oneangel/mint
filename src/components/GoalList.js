import { FlashList } from "@shopify/flash-list";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import GoalCard from "./GoalCard";

export const DATA = [
  {
    id: 1,
    description: "Chuy",
    date: "2022-10-01",
    goal: 100,
  },
  {
    id: 2,
    description: "Chuy",
    date: "2022-10-01",
    goal: 200,
  },
  {
    id: 3,
    description: "Chuy",
    date: "2022-10-01",
    goal: 300,
  },
  {
    id: 4,
    description: "Chuy",
    date: "2022-10-01",
    goal: 400,
  },
];

const GoalList = () => {
  return (
    <View style={styles.transferListContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.goalText}>Transacciones</Text>
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome5
            name="piggy-bank"
            size={15}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ maxHeight: 160, minHeight: 160 }}>
        <View style={styles.flashListContainer}>
          <FlashList
            data={DATA}
            renderItem={({ item }) => <GoalCard {...item} />}
            estimatedItemSize={200}
          />
        </View>
      </ScrollView>
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
