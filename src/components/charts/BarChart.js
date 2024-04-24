import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryTooltip } from "victory-native";
import { format } from "date-fns";

export const BarChart = ({ data, type }) => {

  return (
    <View style={styles.container}>
      <VictoryChart
        width={450}
        theme={VictoryTheme.material}
        domainPadding={{ x: 27 }}
      >
        <VictoryAxis
          style={{ axis: { stroke: "transparent" } }}
        />
        <VictoryBar
          data={data}
          x="day"
          y="amount"
          style={{ data: { fill: `${type === "incomes" ? "#0D9488" : "#B91C1C"}` } }}
          barRatio={1.2}
          events={[{
            target: "data",
            eventHandlers: {
              onPressIn: () => {
                return [
                  {
                    target: "data",
                    mutation: (datum) => {
                      console.log(datum.datum)
                    }
                  }
                ];
              }
            }
          }]}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});