import React, { useEffect, useState, useCallback, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import LocationCard from "../../components/LocationCard";

import { Container, Text } from "../../components/Themed";
import Backend from "../../constants/Backend";
import { LatLngType, LocationType, ExploreStackScreenProps } from "../../types";
import { Loading } from "../../components/Loading";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export function ExploreScreen({ navigation }: ExploreStackScreenProps<"Main">) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const { latlng } = useContext(AuthContext);

  const locationNavigationHandler = (locationID: number) => {
    navigation.navigate("Location", { locationID });
  };

  const fetchRecommendedLocations = useCallback(async (loc: LatLngType) => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const lat = loc.latitude;
      const lng = loc.longitude;

      const { data } = await axios.get<LocationType[]>(
        url + `/data/locations?lat=${lat}&lng=${lng}`
      );
      setLocations(data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedLocations(latlng);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Text style={styles.title} bold>
        All locations
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={locations}
          keyExtractor={(item) => item.locationID.toString()}
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
    paddingBottom: 100,
  },
  loading: {
    position: "absolute",
    left: "50%",
    marginTop: "100%",
  },
});
