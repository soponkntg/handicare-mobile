import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ElevatorIcon } from "./ElevatorIcon";
import { Text } from "./Themed";

interface Props {
  location: string;
  button: string;
  remark?: string;
}

export function ElevatorDetail({ location, button, remark }: Props) {
  return (
    <View style={styles.container}>
      <ElevatorIcon width={56} height={56} size={40} available={true} />
      <View style={styles.textContainer}>
        <Text style={styles.titleMargin} bold>
          Elevator
        </Text>
        <View style={styles.textWithIcon}>
          <Ionicons name="location-sharp" size={20} color="#597EF7" />
          <Text style={styles.text} lightColor="#595959" darkColor="white">
            {location}
          </Text>
        </View>
        <View style={styles.textWithIcon}>
          <MaterialIcons name="touch-app" size={20} color="#597EF7" />
          <Text style={styles.text} lightColor="#595959" darkColor="white">
            {button}
          </Text>
        </View>
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
