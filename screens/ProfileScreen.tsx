import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { Container, Text } from "../components/Themed";
import * as WebBrowser from "expo-web-browser";
import { AuthContext } from "../context/authContext";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export default function ProfileScreen() {
  const [userCreated, setUserCreated] = useState(false);
  const { latlng: _latlng, loginHandler, userData, logoutHandler } =
    useContext(AuthContext);

  const [_googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      expoClientId:
        "68092276774-pd425gfokt9lbl3ngadk7lf6rjd8v6n3.apps.googleusercontent.com",
      iosClientId:
        "68092276774-n59nfv48rp3i1lv4sh0ts4oru4bat0nd.apps.googleusercontent.com",
    });

  const [_faceRequest, faceResponse, facePromptAsync] = Facebook.useAuthRequest({
    expoClientId: "1983457675169499",
  });

  const createUser = async () => {
    if (userData.data && !userCreated) {
      try {
        // const url = Backend.backend_url || "http://localhost:4000";
        const url = "http://localhost:4000";
        const body = {
          id: userData.data.id,
          username: userData.data.name,
          profileImageURL: userData.data.picture,
          email: userData.loginOption, 
        };

        await axios.post(url + `/account/user`, body);
        setUserCreated(true);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  createUser();

  React.useEffect(() => {
    if (googleResponse?.type === "success" && googleResponse.authentication) {
      loginHandler(googleResponse.authentication.accessToken, "google");
    }
  }, [googleResponse]);

  React.useEffect(() => {
    if (faceResponse?.type === "success" && faceResponse.authentication) {
      loginHandler(faceResponse.authentication.accessToken, "facebook");
    }
  }, [faceResponse]);

  return (
    <Container>
      <View style={{ height: "100%", alignItems: "center", paddingTop: 32 }}>
        {userData.token && userData.data ? (
          <>
            <Avatar
              size={120}
              rounded
              title="P"
              source={{ uri: userData.data.picture }}
              imageProps={{ resizeMode: "contain" }}
              containerStyle={{ backgroundColor: "purple" }}
            />
            <Text
              style={{ fontSize: 36, marginTop: 24, textAlign: "center" }}
              bold
            >
              Welcome, {userData.data.name}
            </Text>
            <Button
              title={"Logout"}
              style={{ marginTop: 80 }}
              buttonStyle={{
                width: 260,
                height: 50,
                backgroundColor: "#db3236",
              }}
              onPress={() => {
                logoutHandler();
                setUserCreated(false);
              }}
            />
          </>
        ) : (
          <>
            <Button
              title="Login with Google"
              titleStyle={{ marginLeft: 16 }}
              icon={<FontAwesome5 name="google" size={24} color="white" />}
              buttonStyle={{
                width: 260,
                height: 50,
                backgroundColor: "#db3236",
                marginBottom: 16,
              }}
              onPress={() => {
                googlePromptAsync({ useProxy: true });
              }}
            />
            <Button
              title="Login with Facebook"
              titleStyle={{ marginLeft: 16 }}
              icon={<FontAwesome5 name="facebook-f" size={24} color="white" />}
              buttonStyle={{
                width: 260,
                height: 50,
                backgroundColor: "#4267B2",
                marginBottom: 16,
              }}
              onPress={() => {
                facePromptAsync({ useProxy: true });
              }}
            />
          </>
        )}
        <View
          style={{
            position: "absolute",
            right: 10,
            bottom: 30,
          }}
        >
          <Button
            icon={<FontAwesome name="bullhorn" size={24} color="#2F54EB" />}
            style={{ marginTop: 80 }}
            buttonStyle={{ width: 50, height: 50, borderRadius: 100 }}
            type="outline"
          />
        </View>
      </View>
    </Container>
  );
}
