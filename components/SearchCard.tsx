import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Text } from "../components/Themed";
import { Image } from "react-native-elements";

interface Props {
  name: string;
  placeImage: string;
  navigation(): void;
}

export default function SearchCard({ name, placeImage, navigation }: Props) {
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 327,
    height: 96,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    marginBottom: 16,
  },
  picture: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 8,
  },
  layout: {
    width: 218,
    height: 80,
    marginLeft: 16,
    justifyContent: "flex-start",
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
    color: "black",
  },
});
