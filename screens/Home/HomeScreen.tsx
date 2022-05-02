import React, { useEffect, useState, useCallback, useContext } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import RecommendedCard from "../../components/RecommendedCard";
import { Loading } from "../../components/Loading";
import axios from "axios";

import { ScrollContainer, Text } from "../../components/Themed";
import Backend from "../../constants/Backend";
import {
  HomeStackScreenProps,
  LocationType,
  RestaurantType,
  LatLngType,
} from "../../types";
import { AuthContext } from "../../context/authContext";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

export function HomeScreen({ navigation }: HomeStackScreenProps<"Main">) {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>();
  const { latlng } = useContext(AuthContext);

  const theme = useColorScheme();
  const searchFont = theme === "light" ? "black" : "white";

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
  const fetchRecommendedLocations = useCallback(async (loc: LatLngType) => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const lat = loc.latitude;
      const lng = loc.longitude;

      const { data } = await axios.get<LocationType[]>(
        url + `/data/recommend/location?lat=${lat}&lng=${lng}`
      );
      setLocations(data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const fetchRecommendedRestaurants = useCallback(async (loc: LatLngType) => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const lat = loc.latitude;
      const lng = loc.longitude;

      const { data } = await axios.get<RestaurantType[]>(
        url + `/data/recommend/restaurant?lat=${lat}&lng=${lng}`
      );
      setRestaurants(data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedLocations(latlng);
    fetchRecommendedRestaurants(latlng);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <ScrollContainer>
      <Input
        placeholder="Search"
        leftIcon={<FontAwesome name="search" size={16} color="#597EF7" />}
        inputContainerStyle={{
          borderWidth: 1,
          borderRadius: 24,
          borderColor: "#595959",
          paddingHorizontal: 12,
        }}
        inputStyle={{ fontSize: 12, color: searchFont }}
        value={search}
        onChangeText={(value) => {
          setSearch(value);
        }}
        keyboardType="web-search"
        autoCapitalize="none"
        onSubmitEditing={() => {
          if (search) {
            navigation.navigate("Search", { search });
          }
        }}
      />
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
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
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
