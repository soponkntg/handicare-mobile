/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import { MainStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ProfileScreen from "../screens/ProfileScreen";
import LocationScreen from "../screens/LocationScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import AccessibilityScreen from "../screens/AccessibilityScreen";
import CommentScreen from "../screens/CommentScreen";
import SearchScreen from "../screens/SearchScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : MyTheme}
    >
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Explore"
        component={ExploreStackNavigator}
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const HomeStack = createNativeStackNavigator<MainStackParamList>();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Main"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Accessibility"
        component={AccessibilityScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Comment"
        component={CommentScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      />
    </HomeStack.Navigator>
  );
}

const ExploreStack = createNativeStackNavigator<MainStackParamList>();
function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Main"
        component={ExploreScreen}
        options={{ headerShown: false }}
      ></ExploreStack.Screen>
      <ExploreStack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      ></ExploreStack.Screen>
      <ExploreStack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      ></ExploreStack.Screen>
      <ExploreStack.Screen
        name="Accessibility"
        component={AccessibilityScreen}
        options={{
          headerBackTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerTitle: "",
        }}
      ></ExploreStack.Screen>
    </ExploreStack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -4 }} {...props} />;
}
