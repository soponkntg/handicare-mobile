import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
