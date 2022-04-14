import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RecommendedCard from "../components/RecommendedCard";
import { Loading } from "../components/Loading";
import axios from "axios";

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
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecommendedLocations = useCallback(
    async (loc: Location.LocationObject) => {
      try {
        const url = Backend.backend_url || "http://localhost:4000";
        const lat = loc.coords.latitude;
        const lng = loc.coords.longitude;

        const response = await axios.get(
          url + `/data/recommend/location?lat=${lat}&lng=${lng}`
        );
        const data: LocationType[] = await response.data;
        setLocations(data);
      } catch (error) {
        console.log("error", error);
      }
    },
    []
  );

  const fetchRecommendedRestaurants = useCallback(
    async (loc: Location.LocationObject) => {
      try {
        const url = Backend.backend_url || "http://localhost:4000";
        const lat = loc.coords.latitude;
        const lng = loc.coords.longitude;

        const response = await axios.get(
          url + `/data/recommend/restaurant?lat=${lat}&lng=${lng}`
        );
        const data: RestaurantType[] = await response.data;

        setRestaurants(data);
      } catch (error) {
        console.log("error", error);
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setIsLoading(true);
      fetchRecommendedLocations(currentLocation);
      fetchRecommendedRestaurants(currentLocation);
      setIsLoading(false);
      setLocation(currentLocation);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <View style={styles.section}>
        <Text style={styles.title} bold>
          Top 5 Search Locations
        </Text>
        <View style={styles.recommended}>
          <FlatList
            data={locations}
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
            data={restaurants}
            keyExtractor={(item) =>
              item.restaurantID
                ? item.restaurantID.toString()
                : item.locationID.toString()
            }
            renderItem={({ item }) => (
              <RecommendedCard
                name={
                  item.restaurantName
                    ? item.restaurantName
                    : item.locationtionName
                }
                {...item}
                navigation={() => {
                  if (item.restaurantID) {
                    restaurantNavigationHandler(
                      item.locationID,
                      item.restaurantID
                    );
                  } else {
                    locationNavigationHandler(item.locationID);
                  }
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
