import { MaterialIcons, Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Themed";

interface Props {
  title: string;
  distance: number;
}

export function PlaceTitle({ title, distance }: Props) {
  return (
    <View
      style={[
        styles.row,
        { justifyContent: "space-between", marginBottom: 16 },
      ]}
    >
      <View style={styles.row}>
        <Text style={{ fontSize: 16, marginRight: 4 }} bold>
          {title}
        </Text>
        <MaterialIcons name="verified-user" size={20} color="#19B586" />
      </View>
      <View style={styles.row}>
        {distance == 0 ? null : (
          <>
            <Entypo name="location-pin" size={12} color="#2F54EB" />
            <Text
              style={{ fontSize: 12, marginLeft: 2 }}
              lightColor="#595959"
              darkColor="white"
            >
              {distance} km
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
