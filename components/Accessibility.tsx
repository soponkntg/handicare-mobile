import { MaterialIcons, Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-elements";
import { DoorIcon } from "./DoorIcon";
import { ElevatorIcon } from "./ElevatorIcon";
import { ParkingIcon } from "./ParkingIcon";
import { Text } from "./Themed";
import { ToiletIcon } from "./ToiletIcon";
import { WheelchairIcon } from "./WheelchairIcon";

interface Props {
  rating: number;
  elevator: boolean;
  parking: boolean;
  toilet: boolean;
  wheelchair: boolean;
  door: boolean;
  navigateHandler(): void;
}

export function Accessibility({
  rating,
  elevator,
  parking,
  toilet,
  wheelchair,
  door,
  navigateHandler,
}: Props) {
  return (
    <View style={{ marginVertical: 32 }}>
      <View style={styles.rowSpace}>
        <Text style={{ fontSize: 16 }} bold>
          Accessibilities
        </Text>
        <AirbnbRating
          isDisabled={true}
          showRating={false}
          size={20}
          defaultRating={rating}
        />
      </View>
      <Pressable style={styles.row} onPress={navigateHandler}>
        <ElevatorIcon
          width={56}
          height={56}
          size={40}
          style={styles.iconMargin}
          available={elevator}
        />
        <ParkingIcon
          width={56}
          height={56}
          size={40}
          style={styles.iconMargin}
          available={parking}
        />
        <ToiletIcon
          width={56}
          height={56}
          size={38}
          style={styles.iconMargin}
          available={toilet}
        />
        <WheelchairIcon
          width={56}
          height={56}
          size={38}
          style={styles.iconMargin}
          available={wheelchair}
        />
        <DoorIcon
          width={56}
          height={56}
          size={38}
          style={styles.iconMargin}
          available={door}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rowSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconMargin: {
    marginRight: 8,
  },
});
