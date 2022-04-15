import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ScrollContainer, Text } from "../components/Themed";
import { MainStackScreenProps } from "../types";
import { PlaceTitle } from "../components/PlaceTItile";
import { LocationDetail } from "../components/LocationDetail";
import { PlaceImage } from "../components/PlaceImage";
import { Accessibility } from "../components/Accessibility";
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

export default function LocationScreen({
  navigation,
  route,
}: MainStackScreenProps<"Location">) {
  const [modal, setModal] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState<string>();
  const { userData, latlng } = React.useContext(AuthContext);
  const toogleModal = () => {
    setModal((prev) => !prev);
  };
  const submitComment = () => {
    console.log(rating);
    console.log(comment);
  };
  console.log(latlng);
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
      <PlaceTitle title="Location" distance={1.7} />
      <LocationDetail
        catagory="catagory"
        location="G Rama I Rd, Pathum Wan, Pathum Wan District, Bangkok 10330"
        openingDate={openingDate}
      />
      <PlaceImage images={resImage} />
      <Accessibility
        rating={4}
        elevator={true}
        parking={true}
        toilet={false}
        wheelchair={true}
        door={true}
        navigateHandler={() => {
          navigation.navigate("Accessibility");
        }}
      />
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 16 }} bold>
          Restaurants
        </Text>
        <FlatList
          data={resImage}
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
              source={{ uri: item }}
              containerStyle={styles.picture}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => {
                navigation.navigate("Restaurant", { restaurantID: "1" });
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
            onPress={toogleModal}
          />
        </View>
        {list.map((value, index) => (
          <ListItem key={index}>
            <Avatar
              rounded
              title="PF"
              source={{ uri: value.avatar_url }}
              imageProps={{ resizeMode: "contain" }}
            />
            <ListItem.Content>
              <View style={styles.rowSapce}>
                <Text style={{ fontSize: 12 }} bold>
                  {value.name}
                </Text>
                <AirbnbRating
                  isDisabled={true}
                  showRating={false}
                  size={12}
                  defaultRating={value.rating}
                  selectedColor="#85A5FF"
                />
              </View>
              <Text style={{ fontSize: 12 }}>{value.subtitle}</Text>
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
