import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  size: number;
  width: number;
  height: number;
  available?: boolean;
}

export function WheelchairIcon({
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
      <FontAwesome5 name="wheelchair" size={size} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
