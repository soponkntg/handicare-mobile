import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Text } from "../components/Themed";
import { Image } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { ParkingIcon } from "./ParkingIcon";
import { ToiletIcon } from "./ToiletIcon";
import { ElevatorIcon } from "./ElevatorIcon";
import { WheelchairIcon } from "./WheelchairIcon";
import { DoorIcon } from "./DoorIcon";
import { LocationType, RestaurantType } from "../types";

interface LocationProps extends LocationType {
  name: string;
  navigation(): void;
}
interface RestaurantProps extends RestaurantType {
  name: string;
  navigation(): void;
}

export default function RecommendedCard(
  props: RestaurantProps | LocationProps
) {
  const {
    name,
    placeImage,
    distance,
    ramp,
    toilet,
    elevator,
    door,
    parking,
    navigation,
  } = props;
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={navigation}
    >
      <Image
        source={{ uri: placeImage }}
        containerStyle={styles.picture}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.layout}>
        <Text style={styles.name} bold>
          {name}
        </Text>
        <View style={[styles.row, { marginBottom: 5 }]}>
          {distance && (
            <>
              <Entypo name="location-pin" size={12} color="#2F54EB" />
              <Text style={styles.location}>{`${distance?.toFixed(
                2
              )} km away`}</Text>
            </>
          )}
        </View>
        <View style={styles.row}>
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
    width: 136,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 16,
  },
  picture: {
    width: 136,
    height: 136,
    resizeMode: "contain",
  },
  layout: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
    color: "black",
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
