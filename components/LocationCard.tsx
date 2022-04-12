import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { Text } from "../components/Themed";
import { Entypo } from "@expo/vector-icons";
import { DoorIcon } from "./DoorIcon";
import { ElevatorIcon } from "./ElevatorIcon";
import { ParkingIcon } from "./ParkingIcon";
import { ToiletIcon } from "./ToiletIcon";
import { WheelchairIcon } from "./WheelchairIcon";
import { LocationType } from "../types";

interface Props extends LocationType {
  navigation(): void;
}

export default function LocationCard({
  locationtionName,
  placeImage,
  distance,
  ramp,
  toilet,
  elevator,
  door,
  parking,
  navigation,
}: Props) {

  let source: string = "https://cdn1.iconfinder.com/data/icons/modifiers-add-on-1-1/48/Sed-24-512.png";

  if (placeImage != null) {
    source = placeImage;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={navigation}
    >
      <Image
        source={{ uri: source }}
        containerStyle={styles.picture}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.layout}>
        <Text style={styles.name} bold>
          {locationtionName}
        </Text>
        <View style={[styles.row, { marginBottom: 5 }]}>
          <Entypo name="location-pin" size={12} color="#2F54EB" />
          <Text style={styles.location}>{`${distance.toFixed(2)} km away`}</Text>
        </View>
        <View style={[styles.row, { justifyContent: "flex-end" }]}>
          <ParkingIcon
            width={20}
            height={20}
            size={14}
            available={parking}
            style={styles.iconSpacing}
          />
          <ToiletIcon
            width={20}
            height={20}
            size={12}
            available={toilet}
            style={styles.iconSpacing}
          />
          <ElevatorIcon
            width={20}
            height={20}
            size={14}
            available={elevator}
            style={styles.iconSpacing}
          />
          <WheelchairIcon
            width={20}
            height={20}
            size={12}
            available={ramp}
            style={styles.iconSpacing}
          />
          <DoorIcon
            width={20}
            height={20}
            size={12}
            available={door}
            style={styles.iconSpacing}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 327,
    height: 96,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    marginBottom: 16,
  },
  picture: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 8,
  },
  layout: {
    width: 218,
    height: 80,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  name: {
    color: "#262626",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 10,
    color: "#595959",
  },
  iconSpacing: {
    marginRight: 2,
  },
});
