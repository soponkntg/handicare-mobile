/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

// Root tab screen
export type RootTabParamList = {
  Home: NavigatorScreenParams<MainStackParamList> | undefined;
  Explore: NavigatorScreenParams<MainStackParamList> | undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    CompositeScreenProps<
      NativeStackScreenProps<MainStackParamList>,
      NativeStackScreenProps<MainStackParamList>
    >
  >;

export type MainStackParamList = {
  Main: undefined;
  Search: { search: string };
  Location: { locationID: number };
  Restaurant: { locationID: number; restaurantID?: number };
  Accessibility: {
    elevators: ElevatorType[];
    parkings: ParkingType[];
    toilets: ToiletType[];
    ramps: RampType[];
    doors: DoorType[];
  };
  Comment: { locationID: number; restaurantID?: number };
};

export type MainStackScreenProps<Screen extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, Screen>;

export interface LocationType {
  locationID: number;
  locationtionName: string;
  placeImage: string;
  ramp: boolean;
  toilet: boolean;
  elevator: boolean;
  door: boolean;
  parking: boolean;
  distance: number;
}

export interface LocationInfoType {
  category: string;
  comments: CommentType[];
  contact: string;
  distance: number | null;
  doors: DoorType[];
  elevators: ElevatorType[];
  images: string[];
  googleMap: string;
  located: string;
  locationId: number;
  locationName: string;
  openTime: OpenResponseType[];
  parkings: ParkingType[];
  ramps: RampType[];
  rating: number;
  restaurants: RestaurantSummaryType[];
  toilets: ToiletType[];
}

export interface LocationRestaurantInfoType extends LocationInfoType {
  restaurantId: number;
  restaurantName: string;
  restaurantLocated: string;
  logoURL: string;
  floor: string;
  entrance: string;
  doorType: string;
}

export interface CommentType {
  userId: number;
  userName: string;
  profileImageURL: string;
  rating: number;
  message: string;
  timestamp: Date;
}

export interface Accessibility {
  id: number;
  located: string;
  remark: string;
}

export interface DoorType extends Accessibility {
  doorType: string;
  floor: string;
  passable: boolean;
}

export interface ElevatorType extends Accessibility {
  passable: boolean;
  switch: boolean;
}

export interface OpenResponseType {
  day: string;
  time: string;
}

export interface ParkingType extends Accessibility {
  enoughSpace: boolean;
  nearEntry: boolean;
  floor: string;
}

export interface RampType extends Accessibility {
  slope: string;
  level: number;
  handrail: boolean;
  floor: string;
}

export interface ToiletType extends Accessibility {
  type: string;
  doorType: string;
  handrail: boolean;
  floor: string;
}

export interface RestaurantSummaryType {
  logoURL: string;
  name: string;
  restaurantId: number;
}

export interface RestaurantType extends LocationType {
  restaurantID: number | null;
  restaurantName: string | null;
}

export interface GoogleUserResponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface FacebookUserResponse {
  name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  id: string;
}

export interface UserDataType {
  token?: string;
  data?: {
    id: string;
    name: string;
    picture: string | null;
  };
  loginOption?: "facebook" | "google" | "apple";
}

export interface LatLngType {
  latitude?: number;
  longitude?: number;
}

export interface SearchResponse {
  locationId: number;
  locationName: string;
  restaurantId: number;
  restaurantName: string;
  imageURL: string;
}

export interface CreateUserResponse {
  username: string;
  profileImageURL: string | null;
}
