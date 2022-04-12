import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext, AuthContextProvider } from "./context/authContext";
import * as Location from "expo-location";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { locationHandler, latlng } = useContext(AuthContext);

  useEffect(() => {
    const getLogation = async () => {
      // Locations
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      console.log(coords.latitude);
      locationHandler(coords.latitude, coords.longitude);
    };
    getLogation();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextProvider>
          <Navigation colorScheme={colorScheme} />
        </AuthContextProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
