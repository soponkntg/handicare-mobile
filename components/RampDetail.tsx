import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Themed";
import { WheelchairIcon } from "./WheelchairIcon";

interface Props {
  location: string;
  floor?: string;
  slope?: string;
  level?: string;
  handrail?: string;
  remark?: string;
}

export function RampDetail({
  location,
  floor,
  slope,
  level,
  handrail,
  remark,
}: Props) {
  return (
    <View style={styles.container}>
      <WheelchairIcon width={56} height={56} size={38} available={true} />
      <View style={styles.textContainer}>
        <Text style={styles.titleMargin} bold>
          Ramp
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
        {slope && (
          <View style={styles.textWithIcon}>
            <MaterialCommunityIcons
              name="angle-acute"
              size={20}
              color="#597EF7"
            />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {slope}
            </Text>
          </View>
        )}
        {level && (
          <View style={styles.textWithIcon}>
            <Entypo name="bar-graph" size={20} color="#597EF7" />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {level}
            </Text>
          </View>
        )}
        {handrail && (
          <View style={styles.textWithIcon}>
            <MaterialCommunityIcons name="stairs" size={20} color="#597EF7" />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {handrail}
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
