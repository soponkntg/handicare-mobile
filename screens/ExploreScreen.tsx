import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import LocationCard from "../components/LocationCard";

import { Container, Text } from "../components/Themed";
import { MainStackScreenProps, TEMPRECOMLOCATION } from "../types";

export default function ExploreScreen({
  navigation,
}: MainStackScreenProps<"Main">) {
  const locationNavigationHandler = (locationID: string) => {
    navigation.navigate("Location", { locationID });
  };
  return (
    <Container>
      <Text style={styles.title} bold>
        All locations
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={TEMPRECOMLOCATION}
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
