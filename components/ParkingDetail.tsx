import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ParkingIcon } from "./ParkingIcon";
import { Text } from "./Themed";

interface Props {
  location: string;
  floor?: string;
  door?: string;
  car?: string;
  remark?: string;
}

export function ParkingDetail({ location, floor, door, car, remark }: Props) {
  return (
    <View style={styles.container}>
      <ParkingIcon width={56} height={56} size={40} available={true} />
      <View style={styles.textContainer}>
        <Text style={styles.titleMargin} bold>
          Parking
        </Text>
        <View style={styles.textWithIcon}>
          <Ionicons name="location-sharp" size={20} color="#597EF7" />
          <Text style={styles.text}>{location}</Text>
        </View>
        {floor && (
          <View style={styles.textWithIcon}>
            <MaterialCommunityIcons
              name="floor-plan"
              size={20}
              color="#597EF7"
            />
            <Text style={styles.text}>Floor: {floor}</Text>
          </View>
        )}
        {door && (
          <View style={styles.textWithIcon}>
            <FontAwesome5 name="door-closed" size={16} color="#597EF7" />
            <Text style={styles.text}>{door}</Text>
          </View>
        )}
        {car && (
          <View style={styles.textWithIcon}>
            <FontAwesome5 name="car" size={20} color="#597EF7" />
            <Text style={styles.text}>{car}</Text>
          </View>
        )}
        {remark && (
          <View style={styles.textWithIcon}>
            <MaterialIcons name="comment" size={20} color="#597EF7" />
            <Text style={styles.text}>{remark}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
  },
  textContainer: {
    marginLeft: 16,
  },
  titleMargin: {
    marginBottom: 10,
    color: "black",
  },
  textWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 1,
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
    width: "80%",
    color: "#595959",
  },
});
