import axios from "axios";
import React, { useState, useContext, createRef, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { AirbnbRating } from "react-native-ratings";
import { Container, Text } from "../components/Themed";
import Backend from "../constants/Backend";
import { AuthContext } from "../context/authContext";
import { MainStackScreenProps } from "../types";

export default function CommentScreen({
  navigation,
  route,
}: MainStackScreenProps<"Comment">) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { userData } = useContext(AuthContext);
  const commentRef = createRef<TextInput>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!userData.token && !!userData.data
  );

  useEffect(() => {
    setIsLoggedIn(!!userData.token && !!userData.data);
  }, []);

  const submitComment = async () => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      if (route.params.restaurantID) {
        const commentRestaurantBody = {
          userId: userData.data?.id,
          locationId: route.params.locationID,
          restaurantId: route.params.restaurantID,
          message: comment,
          rating: rating,
        };
        await axios.post(
          url + `/account/restaurant/comment`,
          commentRestaurantBody
        );
      } else {
        const commentLocationBody = {
          userId: userData.data?.id,
          locationId: route.params.locationID,
          message: comment,
          rating: rating,
        };
        await axios.post(
          url + `/account/location/comment`,
          commentLocationBody
        );
      }
      commentRef.current?.clear();
      navigation.goBack();
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoggedIn) {
    return (
      <Container>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }} bold>
            Rate this place
          </Text>
          <AirbnbRating
            showRating={false}
            defaultRating={5}
            size={26}
            starContainerStyle={{ marginVertical: 16 }}
            onFinishRating={(value) => {
              setRating(value);
            }}
          />
          <Input
            ref={commentRef}
            placeholder="write a comment"
            inputContainerStyle={{
              borderRadius: 1,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              padding: 10,
            }}
            inputStyle={{ fontSize: 14 }}
            multiline
            defaultValue={comment}
            onChangeText={(value) => {
              setComment(value);
            }}
          />
          <Button
            title="Submit"
            containerStyle={{ width: 120, paddingHorizontal: 6, marginTop: 40 }}
            titleStyle={{ fontSize: 14 }}
            buttonStyle={{ borderRadius: 12 }}
            onPress={submitComment}
          />
        </View>
      </Container>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 16, textAlign: "center", marginTop: "95%" }}
          bold
        >
          Please login before comment.
        </Text>
        <Button
          title="Back"
          containerStyle={{ width: 120, paddingHorizontal: 6, marginTop: "5%" }}
          titleStyle={{ fontSize: 14 }}
          buttonStyle={{ borderRadius: 12 }}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
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
