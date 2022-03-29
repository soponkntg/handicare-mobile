import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RecommendedCard from "../components/RecommendedCard";

import { Container, Text } from "../components/Themed";
import {
  MainStackScreenProps,
  TEMPRECOMLOCATION,
  TEMPRECOMRES,
} from "../types";

export default function HomeScreen({
  navigation,
}: MainStackScreenProps<"Main">) {
  const locationNavigationHandler = (locationID: string) => {
    navigation.navigate("Location", { locationID });
  };
  const restaurantNavigationHandler = (restaurantID: string) => {
    navigation.navigate("Restaurant", { restaurantID });
  };
  return (
    <Container>
      <View style={styles.section}>
        <Text style={styles.title} bold>
          Top 5 Search Locations
        </Text>
        <View style={styles.recommended}>
          <FlatList
            data={TEMPRECOMLOCATION}
            keyExtractor={(item) => item.locationID}
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
            keyExtractor={(item) => item.restaurantID}
            renderItem={({ item }) => (
              <RecommendedCard
                name={item.restaurantName}
                {...item}
                navigation={() => {
                  restaurantNavigationHandler(item.restaurantID);
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
