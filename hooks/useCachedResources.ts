import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { AuthContext } from "../context/authContext";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { latlngHandler } = useContext(AuthContext);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Get Lat Lng
        const getLogation = async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            return;
          }
          const { coords } = await Location.getCurrentPositionAsync();
          const lat = coords.latitude;
          const lng = coords.longitude;
          latlngHandler(lat, lng);
        };
        await getLogation();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          roboto: require("../assets/fonts/Roboto-Regular.ttf"),
          "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
