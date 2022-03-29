import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  size: number;
  width: number;
  height: number;
  available?: boolean;
}

export function ElevatorIcon({
  size,
  width,
  height,
  available,
  style,
}: Props & View["props"]) {
  const color = available ? "#2F54EB" : "#595959";
  return (
    <View
      style={[
        style,
        styles.container,
        {
          width: width,
          height: height,
          borderRadius: 4,
          backgroundColor: color,
        },
      ]}
    >
      <MaterialCommunityIcons name="elevator" size={size} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
