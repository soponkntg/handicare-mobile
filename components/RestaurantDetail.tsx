import React from "react";
import { Linking, Platform, Pressable, StyleSheet, View } from "react-native";
import { Text } from "./Themed";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import * as WebLinking from "expo-linking";

interface Props {
  catagory: string;
  location: string;
  zone: string;
  contact: string;
  openingDate: string[];
  entrance: string;
  door: string;
  googleMap: string;
}

export function RestaurantDetail({
  catagory,
  location,
  zone,
  contact,
  openingDate,
  entrance,
  door,
  googleMap,
}: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const [head, ...tail] = openingDate;
  const openGoogleMap = () => {
    WebLinking.openURL(googleMap);
  };
  const onPressMobileNumberClick = () => {
    const number = "0" + contact;
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={styles.row}>
        <Ionicons name="md-bookmarks" size={20} color="#2F54EB" />
        <Text style={styles.iconMargin} lightColor="#595959" darkColor="white">
          {catagory}
        </Text>
      </View>
      <View style={styles.row}>
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
        <Entypo name="location" size={20} color="#2F54EB" />
        <Text style={styles.iconMargin} lightColor="#595959" darkColor="white">
          {zone}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons name="phone" size={20} color="#2F54EB" />
        <Text
          style={[styles.iconMargin, styles.locationText]}
          lightColor="#595959"
          darkColor="white"
          onPress={onPressMobileNumberClick}
        >
          0641744793
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
      <View style={styles.row}>
        <MaterialCommunityIcons name="floor-plan" size={20} color="#2F54EB" />
        <Text style={styles.iconMargin} lightColor="#595959" darkColor="white">
          {entrance}
        </Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="door-closed" size={18} color="#2F54EB" />
        <Text style={styles.iconMargin} lightColor="#595959" darkColor="white">
          {door}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
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
