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

const ServicesScreen = () => {
  const [status, setStatus] = React.useState(false);
  const [showArcRanges, setShowArcRanges] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("agua");

  const segments = [
    {
      scale: 0.25,
      filledColor: "#49DC4F",
      emptyColor: "#49DC4F",
      data: { label: "muy bajo" },
    },
    {
      scale: 0.25,
      filledColor: "#FBDA84",
      emptyColor: "#FBDA84",
      data: { label: "bajo" },
    },
    {
      scale: 0.25,
      filledColor: "#F7944C",
      emptyColor: "#F7944C",
      data: { label: "normal" },
    },
    {
      scale: 0.25,
      filledColor: "#D94545",
      emptyColor: "#D94545",
      data: { label: "excesivo" },
    },
  ];

  const ranges = ["10", "20", "30", "40", "50"];

  const _handlePress = () => {
    setShowArcRanges(!showArcRanges);
  };
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
          <LiquidGauge
            config={{
              textVertPosition: 0.8,
              waveAnimateTime: 5000,
              waveHeight: 0.15,
              waveAnimate: false,
              waveOffset: 0.25,
              valueCountUp: false,
              textSuffix: "",
            }}
            value={30}
            width={200}
            height={200}
          />
        ) : (
          <SegmentedArc
            segments={[
              {
                scale: 0.25,
                filledColor: "#49DC4F",
                emptyColor: "#49DC4F",
                data: { label: "muy bajo" },
              },
              {
                scale: 0.25,
                filledColor: "#FBDA84",
                emptyColor: "#FBDA84",
                data: { label: "bajo" },
              },
              {
                scale: 0.25,
                filledColor: "#F7944C",
                emptyColor: "#F7944C",
                data: { label: "normal" },
              },
              {
                scale: 0.25,
                filledColor: "#D94545",
                emptyColor: "#D94545",
                data: { label: "excesivo" },
              },
            ]}
            fillValue={70}
            isAnimated={true}
            animationDelay={1000}
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
        )}
      </Center>
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
