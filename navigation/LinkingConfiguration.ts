/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootTabParamList } from "../types";

const linking: LinkingOptions<RootTabParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: {
        screens: {
          Main: "home",
          Location: "home/location/:locationID",
          Restaurant: "home/restaurant/:locationID/:restaurantID",
          Accessibility: "home/accessibility",
          Comment: "home/comment",
          Modal: "home/modal",
        },
      },
      Explore: {
        screens: {
          Main: "explore",
          Location: "explore/location/:locationID",
          Restaurant: "explore/restaurant/:restaurantID",
          Accessibility: "explore/accessibility",
          Comment: "explore/comment",
          Modal: "explore/modal",
        },
      },
      Profile: {
        screens: {
          ProfileScreen: "profile",
        },
      },
    },
  },
};

export default linking;
