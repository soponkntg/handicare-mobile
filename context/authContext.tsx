import axios from "axios";
import React, { useState, useEffect } from "react";
import Backend from "../constants/Backend";
import {
  CreateUserResponse,
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
    loginOption: "facebook" | "google" | "apple"
  ) => void;
  logoutHandler: () => void;
  latlngHandler: (lat: number, lng: number) => void;
  createAppleUser: (token: string, name: string) => void;
}

export const AuthContext = React.createContext<ContextType>({
  userData: { token: undefined, data: undefined, loginOption: undefined },
  latlng: { latitude: undefined, longitude: undefined },
  loginHandler: (
    tokenString: string,
    loginOption: "facebook" | "google" | "apple"
  ) => {},
  logoutHandler: () => {},
  latlngHandler: (lat: number, lng: number) => {},
  createAppleUser: (token: string, name: string) => {},
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
      const url = Backend.backend_url || "http://localhost:4000";
      const body = {
        id: data.id,
        username: data.name,
        profileImageURL: data.picture,
        loginOption: "google",
      };
      const { data: user } = await axios.post<CreateUserResponse>(
        url + `/account/user`,
        body
      );

      setUserData({
        token,
        data: {
          id: data.id,
          name: user.username,
          picture: user.profileImageURL,
        },
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
      const url = Backend.backend_url || "http://localhost:4000";
      const body = {
        id: data.id,
        username: data.name,
        profileImageURL: data.picture.data.url,
        loginOption: "facebook",
      };

      const { data: user } = await axios.post<CreateUserResponse>(
        url + `/account/user`,
        body
      );
      setUserData({
        token,
        data: {
          id: data.id,
          name: user.username,
          picture: user.profileImageURL,
        },
        loginOption: "facebook",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAppleData = async (token: string) => {
    const url = Backend.backend_url || "http://localhost:4000";
    const body = {
      id: token,
      username: undefined,
      profileImageURL: undefined,
      loginOption: "apple",
    };

    const { data: user } = await axios.post<CreateUserResponse>(
      url + `/account/user`,
      body
    );
    setUserData({
      token,
      data: {
        id: token,
        name: user.username,
        picture: user.profileImageURL,
      },
      loginOption: "apple",
    });
  };

  const createAppleUser = async (token: string, name: string) => {
    try {
      const url = Backend.backend_url || "http://localhost:4000";
      const body = {
        id: token,
        username: name,
        profileImageURL: undefined,
        loginOption: "apple",
      };

      const { data: user } = await axios.post<CreateUserResponse>(
        url + `/account/user`,
        body
      );

      setUserData({
        token,
        data: {
          id: token,
          name: user.username,
          picture: user.profileImageURL,
        },
        loginOption: "apple",
      });
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
        case "apple":
          fetchAppleData(userData.token);
          break;
      }
    }
  }, []);

  const loginHandler = (
    token: string,
    loginOption: "facebook" | "google" | "apple"
  ) => {
    console.log(token);
    switch (loginOption) {
      case "google":
        fetchGoogleData(token);
        break;
      case "facebook":
        fetchFacebookData(token);
        break;
      case "apple":
        fetchAppleData(token);
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
      value={{
        loginHandler,
        userData,
        logoutHandler,
        latlng,
        latlngHandler,
        createAppleUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
