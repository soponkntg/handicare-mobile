import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "./Themed";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import openMap from "react-native-open-maps";

interface Props {
  catagory: string;
  location: string;
  openingDate: string[];
}

export function LocationDetail({ catagory, location, openingDate }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const [head, ...tail] = openingDate;
  const openGoogleMap = () => {
    openMap({ latitude: 37.865101, longitude: -119.53833, provider: "google" });
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={styles.row}>
        <Ionicons name="md-bookmarks" size={20} color="#2F54EB" />
        <Text style={styles.iconMargin} lightColor="#595959" darkColor="white">
          {catagory}
        </Text>
      </View>
      <View style={[styles.row, { marginVertical: 10 }]}>
        <Ionicons name="location-sharp" size={20} color="#2F54EB" />
        <Text
          style={[styles.iconMargin, styles.locationText]}
          lightColor="#595959"
          darkColor="white"
          onPress={openGoogleMap}
        >
          {location}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="clock-time-four-outline"
          size={20}
          color="#2F54EB"
        />
        <Pressable
          style={{ flexGrow: 1 }}
          onPress={() => {
            setExpanded((prev) => !prev);
          }}
        >
          <Text
            style={styles.iconMargin}
            lightColor="#595959"
            darkColor="white"
          >
            {head}
          </Text>
          <View style={[!expanded && styles.hide]}>
            {tail.map((value, index) => (
              <Text
                style={styles.iconMargin}
                lightColor="#595959"
                darkColor="white"
                key={index}
              >
                {value}
              </Text>
            ))}
          </View>
        </Pressable>
        <Ionicons
          name={!expanded ? "caret-down" : "caret-up"}
          size={18}
          color="#2F54EB"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconMargin: {
    marginLeft: 10,
    fontSize: 12,
  },
  locationText: {
    textDecorationLine: "underline",
  },
  hide: {
    display: "none",
  },
});
