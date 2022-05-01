import axios from "axios";
import React, { useState, useEffect } from "react";
import Backend from "../constants/Backend";
import {
  FacebookUserResponse,
  GoogleUserResponse,
  LatLngType,
  UserDataType,
} from "../types";

interface ContextType {
  userData: UserDataType;
  latlng: LatLngType;
  loginHandler: (
    tokenString: string,
    loginOption: "facebook" | "google"
  ) => void;
  logoutHandler: () => void;
  latlngHandler: (lat: number, lng: number) => void;
}

export const AuthContext = React.createContext<ContextType>({
  userData: { token: undefined, data: undefined, loginOption: undefined },
  latlng: { latitude: undefined, longitude: undefined },
  loginHandler: (tokenString: string, loginOption: "facebook" | "google") => {},
  logoutHandler: () => {},
  latlngHandler: (lat: number, lng: number) => {},
});

export const AuthContextProvider = (props: {
  children: React.ReactElement;
}) => {
  const [userData, setUserData] = useState<UserDataType>({
    token: undefined,
    data: undefined,
    loginOption: undefined,
  });
  const [latlng, setLatLng] = useState<LatLngType>({
    latitude: undefined,
    longitude: undefined,
  });

  const fetchGoogleData = async (token: string) => {
    try {
      const { data } = await axios.get<GoogleUserResponse>(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      setUserData({
        token,
        data: { id: data.id, name: data.name, picture: data.picture },
        loginOption: "google",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFacebookData = async (token: string) => {
    try {
      const { data } = await axios.get<FacebookUserResponse>(
        `https://graph.facebook.com/me?fields=name,gender,picture&access_token=${token}`
      );
      setUserData({
        token,
        data: { id: data.id, name: data.name, picture: data.picture.data.url },
        loginOption: "facebook",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createUser = async (userData: UserDataType) => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const body = {
        id: userData.data.id,
        username: userData.data.name,
        profileImageURL: userData.data.picture,
        email: userData.loginOption,
      };

      await axios.post(url + `/account/user`, body);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (userData.token) {
      switch (userData.loginOption) {
        case "google":
          fetchGoogleData(userData.token);
          break;
        case "facebook":
          fetchFacebookData(userData.token);
          break;
      }
    }
  }, []);

  const loginHandler = (token: string, loginOption: "facebook" | "google") => {
    console.log(token);
    switch (loginOption) {
      case "google":
        fetchGoogleData(token);
        break;
      case "facebook":
        fetchFacebookData(token);
        break;
    }
  };

  const logoutHandler = () => {
    setUserData({
      token: undefined,
      data: undefined,
      loginOption: undefined,
    });
  };

  const latlngHandler = (lat: number, lng: number) => {
    setLatLng({ latitude: lat, longitude: lng });
  };

  return (
    <AuthContext.Provider
      value={{ loginHandler, userData, logoutHandler, latlng, latlngHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
