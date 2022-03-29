import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { DoorIcon } from "./DoorIcon";
import { Text } from "./Themed";
import { WheelchairIcon } from "./WheelchairIcon";

interface Props {
  location: string;
  floor?: string;
  door?: string;
  accessibility?: string;
  remark?: string;
}

export function DoorDetail({
  location,
  floor,
  door,
  accessibility,
  remark,
}: Props) {
  return (
    <View style={styles.container}>
      <DoorIcon width={56} height={56} size={38} available={true} />
      <View style={styles.textContainer}>
        <Text style={styles.titleMargin} bold>
          Door
        </Text>
        <View style={styles.textWithIcon}>
          <Ionicons name="location-sharp" size={20} color="#597EF7" />
          <Text style={styles.text} lightColor="#595959" darkColor="white">
            {location}
          </Text>
        </View>
        {floor && (
          <View style={styles.textWithIcon}>
            <MaterialCommunityIcons
              name="floor-plan"
              size={20}
              color="#597EF7"
            />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {floor}
            </Text>
          </View>
        )}
        {door && (
          <View style={styles.textWithIcon}>
            <FontAwesome5 name="door-closed" size={16} color="#597EF7" />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {door}
            </Text>
          </View>
        )}
        {accessibility && (
          <View style={styles.textWithIcon}>
            <Ionicons name="enter" size={20} color="#597EF7" />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {accessibility}
            </Text>
          </View>
        )}
        {remark && (
          <View style={styles.textWithIcon}>
            <MaterialIcons name="comment" size={20} color="#597EF7" />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {remark}
            </Text>
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
  },
});
