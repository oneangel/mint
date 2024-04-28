import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import BottomSheet from "../components/BottomSheet";
import { Center } from "native-base";
import { LiquidGauge } from "react-native-liquid-gauge";
import { SegmentedArc } from "@shipt/segmented-arc-for-react-native";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useGetTWC, useMM, useGetTC } from "../hooks/service.hooks";
import { VictoryChart, VictoryArea, VictoryTheme, VictoryLabel, VictoryContainer, VictoryAxis, VictoryZoomContainer } from "victory-native";

const ServicesScreen = () => {
  const [status, setStatus] = React.useState(false);
  const [showArcRanges, setShowArcRanges] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("agua");

  const queryClient = useQueryClient();

  const {
    data: measureData,
    isLoading: isLoadingMeasure,
    isError: isErrorMeasure,
  } = useQuery("measure", useMM);

  const {
    data: tariffWData,
    isLoading: isLoadingTariffW,
    isError: isErrorTariffW,
  } = useQuery("tariffw", useGetTWC);

  const {
    data: tariffData,
    isLoading: isLoadingTariff,
    isError: isErrorTariff,
  } = useQuery("tariff", useGetTC);

  const segments = [
    {
      scale: 0.25,
      filledColor: "#49DC4F",
      emptyColor: "#49DC4F",
      data: { label: "Basico" },
    },
    {
      scale: 0.25,
      filledColor: "#F7944C",
      emptyColor: "#F7944C",
      data: { label: "Intermedio" },
    },
    {
      scale: 0.25,
      filledColor: "#D94545",
      emptyColor: "#D94545",
      data: { label: "Excesivo" },
    },
  ];

  const ranges = ["0", "150", "300", "450"];

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FDFE" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          top: 20,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#3E70A1" }}>
          Servicios
        </Text>
        <Image
          source={require("../../assets/Icons/mint1.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      {/* <View style={styles.container}>
          <Text style={styles.title}>No hay un medidor asociado 😢</Text>
          <TouchableOpacity onPress={() => setStatus(true)} style={styles.button}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Asociar Medidor
            </Text>
          </TouchableOpacity>
        </View>
        {status && <BottomSheet setStatus={setStatus} />} */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => setSelectedOption("agua")}>
          <Text
            style={[
              styles.optionText,
              selectedOption === "agua" && styles.selectedOption,
            ]}
          >
            Agua
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("electricidad")}>
          <Text
            style={[
              styles.optionText,
              selectedOption === "electricidad" && styles.selectedOption,
            ]}
          >
            Electricidad
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("temperatura")}>
          <Text
            style={[
              styles.optionText,
              selectedOption === "temperatura" && styles.selectedOption,
            ]}
          >
            Temperatura
          </Text>
        </TouchableOpacity>
      </View>

      <Center
        bg="white"
        _text={{
          color: "white",
          fontWeight: "bold",
        }}
        height="300"
        width="300"
        rounded="3xl"
        alignSelf="center"
        shadow={2}
      >
        {selectedOption === "agua" ? (
          <>
            <LiquidGauge
              config={{
                textVertPosition: 0.8,
                waveAnimateTime: 5000,
                waveHeight: 0.15,
                waveAnimate: false,
                waveOffset: 0.25,
                valueCountUp: false,
                textSuffix: "%",
                toFixed: 2
              }}
              value={!isLoadingTariffW && tariffWData ? tariffWData.data?.measure / 340687.06056 : 0}
              width={200}
              height={200}
            />
            <View style={{ flexDirection: "row" }}>
              <Text>
                {!isLoadingTariffW && tariffWData ? tariffWData.data.measure : 0}L
              </Text>
              <Text style={{ marginLeft: 10 }}>
                {!isLoadingTariffW && tariffWData
                  ? tariffWData.data.totalPay.toFixed(2)
                  : 0}
              </Text>
            </View>

          </>
        ) : selectedOption === "electricidad" ? (
          <>
            <SegmentedArc
              segments={segments}
              fillValue={!isLoadingMeasure && measureData ? measureData.data.totalMeasure : 0}
              isAnimated={true}
              animationDelay={1000}
              showArcRanges={showArcRanges}
              ranges={ranges}
            >
              {(metaData) => (
                <TouchableOpacity
                  onPress={() => setShowArcRanges(!showArcRanges)}
                  style={{ alignItems: "center" }}
                >
                  <Text style={{ lineHeight: 50, fontSize: 24 }}>0kw</Text>
                  <Text style={{ fontSize: 16, paddingTop: 16 }}>
                    {metaData.lastFilledSegment.data.label}
                  </Text>
                </TouchableOpacity>
              )}
            </SegmentedArc>
            <View style={{ flexDirection: "row" }}>
              <Text>
                {!isLoadingMeasure && measureData ? measureData.data.totalMeasure.toFixed(2) : 0}kw
              </Text>
              <Text style={{ marginLeft: 10 }}>
                {!isLoadingTariff && tariffData ? tariffData.data.total.toFixed(2) : 0}
              </Text>
            </View>
          </>
        ) : selectedOption === "temperatura" ? (
          <>
          <SegmentedArc
              segments={segments} // Define tus segmentos para temperatura
              fillValue={!isLoadingMeasure && measureData ? measureData.data.totalMeasure : 0}
              isAnimated={true}
              animationDelay={1000}
              showArcRanges={showArcRanges}
              ranges={ranges}
            >
              {(metaData) => (
                <TouchableOpacity onPress={() => setShowArcRanges(!showArcRanges)} style={{ alignItems: "center" }}>
                  <Text style={{ lineHeight: 50, fontSize: 24 }}>0°C</Text>
                  <Text style={{ fontSize: 16, paddingTop: 16 }}>{metaData.lastFilledSegment.data.label}</Text>
                </TouchableOpacity>
              )}
            </SegmentedArc>
            <View style={{ flexDirection: "row" }}>
              <Text>{!isLoadingMeasure && measureData ? measureData.data.totalMeasure.toFixed(2) : 0}°C</Text>
              <Text style={{ marginLeft: 10 }}>{!isLoadingTariff && tariffData ? tariffData.data.total.toFixed(2) : 0}</Text>
            </View>
          </>
        ): null}
      </Center>

      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x" // Define sobre qué eje aplicar el zoom
            zoomDomain={{ x: [1, 3] }} // Dominio inicial del zoom (opcional)
            onZoomDomainChange={this.handleZoom} // Función para manejar los cambios en el dominio de zoom
          />
        }
      >
        <VictoryAxis
          style={{ axis: { stroke: "transparent" } }}
        />
        <VictoryArea
          interpolation="natural"
          style={{ data: { fill: "#3E70A1" } }}
          labels={({ datum }) => datum.y}
          data={[
            { x: 1, y: 2, y0: 0 },
            { x: 2, y: 3, y0: 1 },
            { x: 3, y: 5, y0: 1 },
            { x: 4, y: 4, y0: 2 },
            { x: 5, y: 6, y0: 2 }
          ]}
        />
      </VictoryChart>
    </View>
  );
};
export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 20,
  },
  optionText: {
    fontSize: 18,
    color: "gray",
  },
  selectedOption: {
    fontWeight: "bold",
    color: "#000",
  },
  headerImage: {
    width: 80,
    height: 80,
    tintColor: "#3E70A1",
    alignSelf: "center",
    top: 4,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#40A2E3",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
});