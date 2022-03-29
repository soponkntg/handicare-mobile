import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollContainer, Text } from "../components/Themed";
import { MainStackScreenProps } from "../types";
import { PlaceTitle } from "../components/PlaceTItile";
import { PlaceImage } from "../components/PlaceImage";
import { Accessibility } from "../components/Accessibility";
import { AirbnbRating, Avatar, ListItem } from "react-native-elements";
import { RestaurantDetail } from "../components/RestaurantDetail";

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
  return (
    <ScrollContainer>
      <PlaceTitle title="Restaurant" distance={1.7} />
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
          Crystal Design Center (CDC)
        </Text>
      </Text>
      <RestaurantDetail
        catagory="catagory"
        location="G Rama I Rd, Pathum Wan, Pathum Wan District, Bangkok 10330"
        openingDate={openingDate}
        floor="Require Assistance"
        door="Automatic"
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

      <View>
        <Text style={{ fontSize: 16 }} bold>
          Comments
        </Text>

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
