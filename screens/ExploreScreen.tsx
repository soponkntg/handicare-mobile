import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import LocationCard from "../components/LocationCard";

import { Container, Text } from "../components/Themed";
import { LocationType, MainStackScreenProps, TEMPRECOMLOCATION } from "../types";
import * as Location from 'expo-location';

export default function ExploreScreen({
  navigation,
}: MainStackScreenProps<"Main">) {

  const locationNavigationHandler = (locationID: string) => {
    navigation.navigate("Location", { locationID });
  };

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locations, setLocations] = useState<LocationType[]>([]);

  const fetchRecommendedLocations = useCallback(async (loc: Location.LocationObject) => {
  
    try {
      
      const url = process.env.BE_URL || "http://localhost:4000";
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;

      const response = await fetch(url + `/data/locations?lat=${lat}&lng=${lng}`);
      const data: LocationType[] = await response.json();

      setLocations(data)

    } catch (error) {
      console.log('error',error);
    }
  },[]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      fetchRecommendedLocations(currentLocation);
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <Container>
      <Text style={styles.title} bold>
        All locations
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={locations}
          keyExtractor={(item) => item.locationID}
          renderItem={({ item }) => (
            <LocationCard
              {...item}
              navigation={() => {
                locationNavigationHandler(item.locationID);
              }}
            />
          )}
        />
      </View>
    </Container>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 24,
  },
  listContainer: {
    alignItems: "center",
  },
});
