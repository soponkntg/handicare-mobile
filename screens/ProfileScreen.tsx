import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { Container, Text } from "../components/Themed";
import * as WebBrowser from "expo-web-browser";
import { AuthContext } from "../context/authContext";
import * as Linking from "expo-linking";
import * as AppleAuthentication from "expo-apple-authentication";

WebBrowser.maybeCompleteAuthSession();

export default function ProfileScreen() {
  const [userCreated, setUserCreated] = useState(false);
  const {
    latlng: _latlng,
    loginHandler,
    userData,
    logoutHandler,
    createAppleUser,
  } = useContext(AuthContext);

  const [_googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      expoClientId:
        "68092276774-pd425gfokt9lbl3ngadk7lf6rjd8v6n3.apps.googleusercontent.com",
      iosClientId:
        "68092276774-n59nfv48rp3i1lv4sh0ts4oru4bat0nd.apps.googleusercontent.com",
    });

  const openReport = () => {
    Linking.openURL("https://forms.gle/MaS1PUAtMY83jFVX8");
  };

  React.useEffect(() => {
    if (googleResponse?.type === "success" && googleResponse.authentication) {
      loginHandler(googleResponse.authentication.accessToken, "google");
    }
  }, [googleResponse]);

  // const [_faceRequest, faceResponse, facePromptAsync] = Facebook.useAuthRequest(
  //   {
  //     expoClientId: "1983457675169499",
  //   }
  // );

  // React.useEffect(() => {
  //   if (faceResponse?.type === "success" && faceResponse.authentication) {
  //     loginHandler(faceResponse.authentication.accessToken, "facebook");
  //   }
  // }, [faceResponse]);

  return (
    <Container>
      <View style={{ height: "100%", alignItems: "center", paddingTop: 32 }}>
        {userData.token && userData.data ? (
          <>
            <Avatar
              size={120}
              rounded
              title={userData.data.name.charAt(0)}
              source={{
                uri:
                  userData.data.picture === null
                    ? undefined
                    : userData.data.picture,
              }}
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
            {/* <Button
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
            /> */}
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={2}
              style={{ width: 260, height: 50 }}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  const detailsArePopulated: boolean =
                    credential.email !== null;
                  if (detailsArePopulated) {
                    const username =
                      credential.fullName?.givenName! +
                      " " +
                      credential.fullName?.familyName!;
                    createAppleUser(credential.user, username);
                  } else {
                    loginHandler(credential.user, "apple");
                  }
                  console.log(credential);
                  // signed in
                } catch (e) {
                  console.log(e);
                }
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
            onPress={openReport}
          />
        </View>
      </View>
    </Container>
  );
}
