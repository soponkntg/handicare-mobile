import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollContainer, Text } from "../../components/Themed";
import {
  LatLngType,
  LocationRestaurantInfoType,
  HomeStackScreenProps,
} from "../../types";
import { PlaceTitle } from "../../components/PlaceTItile";
import { PlaceImage } from "../../components/PlaceImage";
import { Accessibility } from "../../components/Accessibility";
import { Loading } from "../../components/Loading";
import {
  AirbnbRating,
  Avatar,
  Button,
  Dialog,
  ListItem,
} from "react-native-elements";
import { RestaurantDetail } from "../../components/RestaurantDetail";
import axios from "axios";
import Backend from "../../constants/Backend";
import { AuthContext } from "../../context/authContext";
import { useFocusEffect } from "@react-navigation/native";

export function RestaurantScreen({
  navigation,
  route,
}: HomeStackScreenProps<"Restaurant">) {
  const [restaurant, setRestaurant] = useState<LocationRestaurantInfoType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { latlng, userData } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  const fetchLocationRestaurantDetail = useCallback(async (loc: LatLngType) => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const body = {
        lat: loc.latitude,
        lng: loc.longitude,
        locationId: route.params.locationID,
        restaurantId: route.params.restaurantID,
      };

      const { data } = await axios.post<LocationRestaurantInfoType>(
        url + `/data/location/restaurant`,
        body
      );
      setRestaurant(data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    fetchLocationRestaurantDetail(latlng);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLocationRestaurantDetail(latlng);
    }, [fetchLocationRestaurantDetail])
  );

  if (isLoading) {
    return <Loading />;
  }

  const commentNavigationHandler = (
    locationID: number,
    restaurantID?: number
  ) => {
    navigation.navigate("Comment", { locationID, restaurantID });
  };

  const toggleModal = () => {
    if (userData.token && userData.data && restaurant) {
      commentNavigationHandler(restaurant.locationId, restaurant.restaurantId);
    } else {
      setModal(true);
    }
  };

  const openingDate =
    restaurant?.openTime.map((item) => item.day + " " + item.time) || [];

  const Modal = () => {
    return (
      <Dialog isVisible={modal} overlayStyle={{ borderRadius: 16 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 16,
              color: "black",
            }}
            bold
          >
            Please login before comment
          </Text>
          <Button
            title="Close"
            containerStyle={{ width: 120, paddingHorizontal: 6 }}
            titleStyle={{ fontSize: 12 }}
            buttonStyle={{ borderRadius: 12 }}
            onPress={() => setModal(false)}
          />
        </View>
      </Dialog>
    );
  };

  return (
    <ScrollContainer>
      <Modal />
      <PlaceTitle
        title={restaurant?.restaurantName || "restaurant"}
        distance={
          restaurant?.distance != null ? +restaurant?.distance.toFixed(2)! : 0
        }
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
          {restaurant?.locationName || "location"}
        </Text>
      </Text>
      <RestaurantDetail
        catagory={restaurant?.category || "category"}
        location={restaurant?.located || "Location"}
        zone={`Floor: ${restaurant?.floor}${
          restaurant?.restaurantLocated === ""
            ? ""
            : `, Zone: ${restaurant?.restaurantLocated}`
        }`}
        openingDate={openingDate}
        contact={restaurant?.contact || "contact"}
        entrance={restaurant?.entrance || "floor"}
        door={restaurant?.doorType || "door type"}
        googleMap={restaurant?.googleMap || "www.googlemap.com"}
      />
      <PlaceImage images={restaurant?.images || []} />
      <Accessibility
        rating={restaurant?.rating || 0}
        elevator={restaurant?.elevators.length != 0}
        parking={restaurant?.parkings.length != 0}
        toilet={restaurant?.toilets.length != 0}
        wheelchair={restaurant?.ramps.length != 0}
        door={restaurant?.doors.length != 0}
        navigateHandler={() => {
          navigation.navigate("Accessibility", {
            elevators: restaurant?.elevators || [],
            parkings: restaurant?.parkings || [],
            toilets: restaurant?.toilets || [],
            ramps: restaurant?.ramps || [],
            doors: restaurant?.doors || [],
          });
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
            onPress={toggleModal}
          />
        </View>
        {(restaurant?.comments || []).map((value, index) => (
          <ListItem key={index}>
            <Avatar
              rounded
              title={value.userName.charAt(0)}
              source={{
                uri:
                  value.profileImageURL === null
                    ? undefined
                    : value.profileImageURL,
              }}
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
