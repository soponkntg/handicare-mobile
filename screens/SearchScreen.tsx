import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import { Loading } from "../components/Loading";
import SearchCard from "../components/SearchCard";

import { Container, Text } from "../components/Themed";
import Backend from "../constants/Backend";
import { MainStackScreenProps, SearchResponse } from "../types";

export default function SearchScreen({
  navigation,
  route,
}: MainStackScreenProps<"Search">) {
  const [search, setSearch] = useState<string>(route.params.search);
  const [searchResult, setSearchResult] = useState<SearchResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchPlaces = async () => {
    setLoading(true);
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const { data } = await axios.get<SearchResponse[]>(
        url + `/data/search?searchQuery=${search}`
      );
      setSearchResult(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    searchPlaces();
  }, []);
  console.log(searchResult);

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <Input
        placeholder="Search"
        leftIcon={<FontAwesome name="search" size={16} color="#597EF7" />}
        inputContainerStyle={{
          borderWidth: 1,
          borderRadius: 24,
          borderColor: "#595959",
          paddingHorizontal: 12,
        }}
        inputStyle={{ fontSize: 12 }}
        value={search}
        onChangeText={(value) => {
          setSearch(value);
        }}
        keyboardType="web-search"
        autoCapitalize="none"
        onSubmitEditing={() => {
          searchPlaces();
        }}
      />
      <View style={styles.listContainer}>
        {searchResult.length != 0 ? (
          <FlatList
            data={searchResult}
            keyExtractor={(item) =>
              item.restaurantId
                ? item.restaurantId.toString() + Math.random()
                : item.locationId.toString() + Math.random()
            }
            renderItem={({ item }) => (
              <SearchCard
                name={
                  item.restaurantId
                    ? `${item.restaurantName}, ${item.locationName}`
                    : item.locationName
                }
                placeImage={item.imageURL}
                navigation={() => {
                  if (item.restaurantId) {
                    restaurantNavigationHandler(
                      item.locationId,
                      item.restaurantId
                    );
                  } else {
                    locationNavigationHandler(item.locationId);
                  }
                }}
              />
            )}
          />
        ) : (
          <Text style={styles.noResult} bold>
            No result
          </Text>
        )}
      </View>
    </Container>
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
  listContainer: {
    alignItems: "center",
    paddingBottom: 150,
  },
  noResult: {
    textAlign: "center",
    fontSize: 20,
    color: "#595959",
  },
});
