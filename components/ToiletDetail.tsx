import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Themed";
import { ToiletIcon } from "./ToiletIcon";

interface Props {
  location: string;
  floor?: string;
  type?: string;
  door?: string;
  handrail?: string;
  remark?: string;
}

export function ToiletDetail({
  location,
  floor,
  type,
  door,
  handrail,
  remark,
}: Props) {
  return (
    <View style={styles.container}>
      <ToiletIcon width={56} height={56} size={38} available={true} />
      <View style={styles.textContainer}>
        <Text style={styles.titleMargin} bold>
          Toilet
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
              Floor: {floor}
            </Text>
          </View>
        )}
        {type && (
          <View style={styles.textWithIcon}>
            <MaterialCommunityIcons
              name="human-male-female"
              size={20}
              color="#597EF7"
            />
            <Text style={styles.text} lightColor="#595959" darkColor="white">
              {type}
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
