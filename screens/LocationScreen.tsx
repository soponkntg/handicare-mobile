import React from "react";
import { useState, useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ScrollContainer, Text } from "../components/Themed";
import { LocationInfoType, MainStackScreenProps } from "../types";
import { PlaceTitle } from "../components/PlaceTItile";
import { LocationDetail } from "../components/LocationDetail";
import { PlaceImage } from "../components/PlaceImage";
import { Accessibility } from "../components/Accessibility";
import {
  AirbnbRating,
  Avatar,
  Button,
  Image,
  ListItem,
} from "react-native-elements";
import * as Location from 'expo-location';

const _openingDate = [
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
];

const _resImage = [
  "https://www.siamfuture.com/images/content/projects/j_avenue/j_avenue-1.jpg",
  "https://www.siamfuture.com/images/content/projects/j_avenue/j_avenue-4.jpg",
  "https://img.wongnai.com/p/1920x0/2020/01/22/37270d2bda7447b58c70aa0b7ed7e87f.jpg",
  "https://lh5.googleusercontent.com/p/AF1QipMKTlEAi7Qev0mDQb-CfTDyi6j_tmfEfErIROpp=w1080-k-no",
  "https://api.soimilk.com/sites/default/files/u143208/j_avenue-21_2.jpg",
];

const _list = [
  {
    name: "Amy Farha",
    avatar_url: "http://www.bradshawfoundation.com/bfnews/uploads/erectus2.jpg",
    subtitle: "So many restaurants here. Great facilities.",
    rating: 4,
  },
  {
    name: "Chris Jackson",
    avatar_url: "http://www.bradshawfoundation.com/bfnews/uploads/erectus2.jpg",
    subtitle: "So many restaurants here. Great facilities.",
    rating: 4,
  },
];

export default function LocationScreen({
  navigation,
  route,
}: MainStackScreenProps<"Location">) {
  console.log(route.params.locationID)
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationInfoType>();

  const fetchRecommendedLocations = useCallback(async (loc: Location.LocationObject) => {
  
    try {
      
      const url = process.env.BE_URL || "http://localhost:4000";
      const body = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude, 
        locationId: route.params.locationID,
      }

      const response = await fetch(url + `/data/location`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }

      });

      const data: LocationInfoType = await response.json();
      console.log(data);
      setLocation(data);

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

      let currentLoc = await Location.getCurrentPositionAsync({});
      fetchRecommendedLocations(currentLoc);
      setCurrentLocation(currentLoc);
    })();
  }, []);

  const locationIsExisted = location != undefined
  const distance = (locationIsExisted && location.distance != null) ? +location.distance.toFixed(2) : 0;
  const openingDate = locationIsExisted ? location.openTime.map(item => item.day+' '+item.time) : _openingDate;
  const images = locationIsExisted ? location.images : _resImage;
  const comments = locationIsExisted ? location.comments : [];
  const restaurants = locationIsExisted ? location.restaurants: [];

  return (
    <ScrollContainer>
      <PlaceTitle title={locationIsExisted ? location.locationName : "location"} distance={distance} />
      <LocationDetail
        catagory={locationIsExisted ? location.category : "category"}
        location={locationIsExisted ? location.located : "address"}
        openingDate={openingDate}
      />
      <PlaceImage images={images} />
      <Accessibility
        rating={locationIsExisted ? location.rating : 0}
        elevator={locationIsExisted ? location.elevators.length > 0 : false}
        parking={locationIsExisted ? location.parkings.length > 0 : false}
        toilet={locationIsExisted ? location.toilets.length > 0 : false}
        wheelchair={locationIsExisted ? location.ramps.length > 0 : false}
        door={locationIsExisted ? location.doors.length > 0 : false}
        navigateHandler={() => {
          navigation.navigate("Accessibility");
        }}
      />
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 16 }} bold>
          Restaurants
        </Text>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => {
            return (
              item.toString() +
              new Date().getTime().toString() +
              Math.floor(
                Math.random() * Math.floor(new Date().getTime())
              ).toString()
            );
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.logoURL }}
              containerStyle={styles.picture}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => {
                navigation.navigate("Restaurant", { restaurantID: item.restaurantId });
              }}
            />
          )}
          horizontal
        />
      </View>
      <View>
        <View style={styles.rowSapce}>
          <Text style={{ fontSize: 16 }} bold>
            Comments
          </Text>
          <Button

            title="Add a comment"
            type="outline"
            containerStyle={{ width: 120, paddingHorizontal: 6 }}
            titleStyle={{ fontSize: 12 }}
            buttonStyle={{ borderRadius: 12 }}
          />
        </View>
        {comments.map((value, index) => (
          <ListItem key={index}>
            <Avatar
              rounded
              title="PF"
              source={{ uri: value.profileImageURL }}
              imageProps={{ resizeMode: "contain" }}
            />
            <ListItem.Content>
              <View style={styles.rowSapce}>
                <Text style={{ fontSize: 12 }} bold>
                  {value.userName}
                </Text>
                <AirbnbRating
                  isDisabled={true}
                  showRating={false}
                  size={12}
                  defaultRating={value.rating}
                  selectedColor="#85A5FF"
                />
              </View>
              <Text style={{ fontSize: 12 }}>{value.message}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 16,
    marginRight: 8,
  },
  rowSapce: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
