import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RecommendedCard from "../components/RecommendedCard";

import { Container, Text } from "../components/Themed";
import Backend from "../constants/Backend";
import {
  MainStackScreenProps,
  TEMPRECOMLOCATION,
  TEMPRECOMRES,
  LocationType,
  RestaurantType,
} from "../types";
import * as Location from "expo-location";

export default function HomeScreen({
  navigation,
}: MainStackScreenProps<"Main">) {
  const locationNavigationHandler = (locationID: number) => {
    navigation.navigate("Location", { locationID });
  };
  const restaurantNavigationHandler = (
    locationID: number,
    restaurantID: number
  ) => {
    navigation.navigate("Restaurant", {
      locationID,
      restaurantID,
    });
  };
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [restaurant, setRestaurants] = useState<RestaurantType[]>([]);

  // const fetchRecommendedLocations = useCallback(
  //   async (loc: Location.LocationObject) => {
  //     try {
  //       const url = Backend.backend_url || "http://localhost:4000";
  //       const lat = loc.coords.latitude;
  //       const lng = loc.coords.longitude;

  //       const response = await fetch(
  //         url + `/data/locations?lat=${lat}&lng=${lng}`
  //       );
  //       const data: LocationType[] = await response.json();

  //       setLocations(data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   },
  //   []
  // );

  // const fetchRecommendedRestaurants = useCallback(
  //   async (loc: Location.LocationObject) => {
  //     try {
  //       const url = process.env.BE_URL || "http://localhost:4000";
  //       const lat = loc.coords.latitude;
  //       const lng = loc.coords.longitude;

  //       const response = await fetch(
  //         url + `/data/locations?lat=${lat}&lng=${lng}`
  //       );
  //       const data: LocationType[] = await response.json();

  //       setLocations(data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   },
  //   []
  // );

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     fetchRecommendedLocations(currentLocation);
  //     setLocation(currentLocation);
  //   })();
  // }, []);
  return (
    <Container>
      <View style={styles.section}>
        <Text style={styles.title} bold>
          Top 5 Search Locations
        </Text>
        <View style={styles.recommended}>
          <FlatList
            data={TEMPRECOMLOCATION}
            keyExtractor={(item) => item.locationID.toString()}
            renderItem={({ item }) => (
              <RecommendedCard
                name={item.locationtionName}
                {...item}
                navigation={() => {
                  locationNavigationHandler(item.locationID);
                }}
              />
            )}
            horizontal
          />
        </View>
      </View>
      <View>
        <Text style={styles.title} bold>
          Top 5 Search Restaurants
        </Text>
        <View style={styles.recommended}>
          <FlatList
            data={TEMPRECOMRES}
            keyExtractor={(item) => item.restaurantID.toString()}
            renderItem={({ item }) => (
              <RecommendedCard
                name={item.restaurantName}
                {...item}
                navigation={() => {
                  restaurantNavigationHandler(
                    item.locationID,
                    item.restaurantID
                  );
                }}
              />
            )}
            horizontal
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
  recommended: {
    backgroundColor: "#85A5FF",
    borderRadius: 16,
    paddingLeft: 16,
    paddingVertical: 16,
  },
});
