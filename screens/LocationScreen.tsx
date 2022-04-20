import React, { useContext } from "react";
import { useState, useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ScrollContainer, Text } from "../components/Themed";
import { LatLngType, LocationInfoType, MainStackScreenProps } from "../types";
import { PlaceTitle } from "../components/PlaceTItile";
import { LocationDetail } from "../components/LocationDetail";
import { PlaceImage } from "../components/PlaceImage";
import { Accessibility } from "../components/Accessibility";
import Backend from "../constants/Backend";
import {
  AirbnbRating,
  Avatar,
  Button,
  Dialog,
  Image,
  Input,
  ListItem,
} from "react-native-elements";
import { AuthContext } from "../context/authContext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Loading } from "../components/Loading";

export default function LocationScreen({
  navigation,
  route,
}: MainStackScreenProps<"Location">) {
  const [location, setLocation] = useState<LocationInfoType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>();
  const { userData, latlng } = useContext(AuthContext);

  const toogleModal = () => {
    setModal((prev) => !prev);
  };

  const fetchRecommendedLocations = useCallback(async (loc: LatLngType) => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const body = {
        lat: loc.latitude,
        lng: loc.longitude,
        locationId: route.params.locationID,
      };

      const { data } = await axios.post<LocationInfoType>(
        url + `/data/location`,
        body
      );
      setLocation(data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedLocations(latlng);
    setIsLoading(false);
  }, []);

  const submitComment = () => {
    console.log(rating);
    console.log(comment);
  };

  const locationIsExisted = location != undefined;
  const openingDate =
    location?.openTime.map((item) => item.day + " " + item.time) || [];

  if (isLoading) {
    return <Loading />;
  }
  const Modal = () => {
    return (
      <Dialog isVisible={modal} overlayStyle={{ borderRadius: 16 }}>
        {userData.token && userData.data ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="close"
              size={20}
              color="black"
              style={{
                alignSelf: "flex-start",
                position: "absolute",
                top: 0,
                left: 4,
              }}
              onPress={toogleModal}
            />
            <Text style={{ fontSize: 16 }} bold>
              Rate this place
            </Text>
            <AirbnbRating
              showRating={false}
              defaultRating={5}
              size={26}
              starContainerStyle={{ marginVertical: 16 }}
              onFinishRating={(rating) => {
                setRating(rating);
              }}
            />
            <Input
              placeholder="write a comment"
              inputContainerStyle={{
                borderRadius: 1,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                padding: 10,
              }}
              inputStyle={{ fontSize: 14 }}
              multiline
              onChangeText={(value) => {
                setComment(value);
              }}
            />
            <Button
              title="Submit"
              containerStyle={{ width: 120, paddingHorizontal: 6 }}
              titleStyle={{ fontSize: 12 }}
              buttonStyle={{ borderRadius: 12 }}
              onPress={submitComment}
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, textAlign: "center", marginBottom: 16 }}
              bold
            >
              Please login before comment
            </Text>
            <Button
              title="Close"
              containerStyle={{ width: 120, paddingHorizontal: 6 }}
              titleStyle={{ fontSize: 12 }}
              buttonStyle={{ borderRadius: 12 }}
              onPress={toogleModal}
            />
          </View>
        )}
      </Dialog>
    );
  };

  return (
    <ScrollContainer>
      <Modal />
      <PlaceTitle
        title={location?.locationName || "Location"}
        distance={
          location?.distance != null ? +location?.distance.toFixed(2)! : 0
        }
      />
      <LocationDetail
        catagory={location?.category || "category"}
        location={location?.located || "address"}
        openingDate={openingDate}
        googleMap={location?.googelMap || "www.googlemap.com"}
        contact={location?.contact || "0"}
      />
      <PlaceImage images={location?.images || []} />
      <Accessibility
        rating={location?.rating || 0}
        elevator={location?.elevators.length != 0}
        parking={location?.parkings.length != 0}
        toilet={location?.toilets.length != 0}
        wheelchair={location?.ramps.length != 0}
        door={location?.doors.length != 0}
        navigateHandler={() => {
          navigation.navigate("Accessibility", {
            elevators: location?.elevators || [],
            parkings: location?.parkings || [],
            toilets: location?.toilets || [],
            ramps: location?.ramps || [],
            doors: location?.doors || [],
          });
        }}
      />
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 16 }} bold>
          Restaurants
        </Text>
        <FlatList
          data={location?.restaurants || []}
          keyExtractor={(item) => {
            return item.restaurantId.toString();
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.logoURL }}
              containerStyle={styles.picture}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => {
                if (locationIsExisted) {
                  navigation.navigate("Restaurant", {
                    locationID: location?.locationId!,
                    restaurantID: item.restaurantId,
                  });
                }
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
        {(location?.comments || []).map((value, index) => (
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
  loading: {
    position: "absolute",
    left: "50%",
    marginTop: "100%",
  },
});
