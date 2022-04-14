import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollContainer, Text } from "../components/Themed";
import { LocationRestaurantInfoType, MainStackScreenProps } from "../types";
import { PlaceTitle } from "../components/PlaceTItile";
import { PlaceImage } from "../components/PlaceImage";
import { Accessibility } from "../components/Accessibility";
import { Loading } from "../components/Loading";
import { AirbnbRating, Avatar, Button, ListItem } from "react-native-elements";
import { RestaurantDetail } from "../components/RestaurantDetail";
import axios from "axios";
import Backend from "../constants/Backend";
import * as Location from "expo-location";

const openingDate = [
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
  "Mon 10.00 - 22.00",
];

const resImage = [
  "https://www.siamfuture.com/images/content/projects/j_avenue/j_avenue-1.jpg",
  "https://www.siamfuture.com/images/content/projects/j_avenue/j_avenue-4.jpg",
  "https://img.wongnai.com/p/1920x0/2020/01/22/37270d2bda7447b58c70aa0b7ed7e87f.jpg",
  "https://lh5.googleusercontent.com/p/AF1QipMKTlEAi7Qev0mDQb-CfTDyi6j_tmfEfErIROpp=w1080-k-no",
  "https://api.soimilk.com/sites/default/files/u143208/j_avenue-21_2.jpg",
];

const list = [
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

export default function RestaurantScreen({
  navigation,
  route,
}: MainStackScreenProps<"Restaurant">) {
  // console.log(route.params.locationID);
  // console.log(route.params.restaurantID);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState<LocationRestaurantInfoType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchLocationRestuarantDeatail = useCallback(
    async (loc: Location.LocationObject) => {
      try {
        const url = Backend.backend_url || "http://localhost:4000";
        const body = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          locationId: route.params.locationID,
          restaurantId: route.params.restaurantID,
        };

        const response = await axios.post(
          url + `/data/location/restaurant`,
          body
        );

        const data: LocationRestaurantInfoType = await response.data;
        setRestaurant(data);
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

      let currentLoc = await Location.getCurrentPositionAsync({});
      setIsLoading(true);
      fetchLocationRestuarantDeatail(currentLoc);
      setIsLoading(false);
      setCurrentLocation(currentLoc);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const restaurantIsExisted = restaurant != undefined;
  const distance =
    restaurantIsExisted && restaurant.distance != null
      ? +restaurant.distance.toFixed(2)
      : 0;
  const openingDate = restaurantIsExisted
    ? restaurant.openTime.map((item) => item.day + " " + item.time)
    : [];
  const images = restaurantIsExisted ? restaurant.images : [];
  const comments = restaurantIsExisted ? restaurant.comments : [];
  return (
    <ScrollContainer>
      <PlaceTitle
        title={restaurantIsExisted ? restaurant.restaurantName : "restaurant"}
        distance={distance}
      />
      <Text style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 12 }} lightColor="#595959" darkColor="white">
          Located in{" "}
        </Text>
        <Text
          style={{ fontSize: 13 }}
          lightColor="#595959"
          darkColor="white"
          bold
        >
          {restaurantIsExisted ? restaurant.locationName : "location"}
        </Text>
      </Text>
      <RestaurantDetail
        catagory={restaurantIsExisted ? restaurant.category : "category"}
        location={`${
          restaurantIsExisted
            ? restaurant.floor +
              ", " +
              restaurant.located +
              ", " +
              restaurant.restaurantLocated
            : "floor, located, restaurant locateed"
        }`}
        openingDate={openingDate}
        // contact={restaurantIsExisted ? restaurant.contact : "contact"} wait for interface implement
        floor={restaurantIsExisted ? restaurant.entrance : "floor"}
        door={restaurantIsExisted ? restaurant.doorType : "door type"}
      />
      <PlaceImage images={images} />
      <Accessibility
        rating={restaurantIsExisted ? restaurant.rating : 0}
        elevator={restaurantIsExisted ? restaurant.elevators.length > 0 : false}
        parking={restaurantIsExisted ? restaurant.parkings.length > 0 : false}
        toilet={restaurantIsExisted ? restaurant.toilets.length > 0 : false}
        wheelchair={restaurantIsExisted ? restaurant.ramps.length > 0 : false}
        door={restaurantIsExisted ? restaurant.doors.length > 0 : false}
        navigateHandler={() => {
          navigation.navigate("Accessibility");
        }}
      />
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
