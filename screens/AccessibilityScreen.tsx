import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { DoorDetail } from "../components/DoorDetail";
import { ElevatorDetail } from "../components/ElevatorDetail";
import { ParkingDetail } from "../components/ParkingDetail";
import { RampDetail } from "../components/RampDetail";

import { Container, ScrollContainer, Text } from "../components/Themed";
import { ToiletDetail } from "../components/ToiletDetail";
import {
  DoorType,
  ElevatorType,
  MainStackScreenProps,
  RampType,
} from "../types";

export default function AccessibilityScreen({
  navigation,
  route,
}: MainStackScreenProps<"Accessibility">) {
  const [elevatorExpanded, setElevatorExpanded] = React.useState(true);
  const [parkingExpanded, setParkingExpanded] = React.useState(true);
  const [toiletExpanded, setToiletExpanded] = React.useState(true);
  const [rampExpanded, setRampExpanded] = React.useState(true);
  const [doorExpanded, setDoorExpanded] = React.useState(true);

  const elevators = route.params.elevators;
  const parkings = route.params.parkings;
  const ramps = route.params.ramps;
  const doors = route.params.doors;
  const toilets = route.params.toilets;

  const displayText = (str: string) => {
    return str.length > 0 ? str : "-";
  };
  const displaySwitch = (b: boolean) => {
    return b ? "Switch" : "No Usable Switch";
  };
  const displayHandrail = (b: boolean) => {
    return b ? "Handrail" : "No handrail";
  };
  const displayEnoughSpace = (b: boolean) => {
    return b ? "Available (vacant)" : "Not available";
  };
  const displayNearEntry = (b: boolean) => {
    return b ? "Near entry" : "Not near entry";
  };

  const elevatorsList = elevators.map((item) => {
    return (
      <ElevatorDetail
        location={displayText(item.located)}
        button={displaySwitch(item.switch)}
        remark={displayText(item.remark)}
        key={"e" + item.id}
      />
    );
  });

  const parkingsList = parkings.map((item) => {
    return (
      <ParkingDetail
        key={"p" + item.id}
        location={displayText(item.located)}
        floor={displayText(item.floor)}
        door={displayNearEntry(item.nearEntry)}
        car={displayEnoughSpace(item.enoughSpace)}
        remark={displayText(item.remark)}
      />
    );
  });

  const toiletsList = toilets.map((item) => {
    return (
      <ToiletDetail
        key={"t" + item.id}
        location={displayText(item.located)}
        floor={displayText(item.floor)}
        type={displayText(item.type)}
        door={displayText(item.doorType)}
        handrail={displayHandrail(item.handrail)}
        remark={displayText(item.remark)}
      />
    );
  });

  const rampsList = ramps.map((item) => {
    return (
      <RampDetail
        key={"r" + item.id}
        location={displayText(item.located)}
        floor={displayText(item.floor)}
        slope={displayText(item.slope)}
        level={item.level.toString()}
        handrail={displayHandrail(item.handrail)}
        remark={displayText(item.remark)}
      />
    );
  });

  const doorsList = doors.map((item) => {
    return (
      <DoorDetail
        key={"d" + item.id}
        location={item.located.length > 0 ? item.located : "-"}
        floor={item.floor.length > 0 ? item.floor : "-"}
        door={item.doorType.length > 0 ? item.doorType : "-"}
        remark={item.remark.length > 0 ? item.remark : "-"}
      />
    );
  });

  return (
    <ScrollContainer>
      <Text style={styles.title} bold>
        Accessibilities
      </Text>
      {elevatorsList.length > 0 && (
        <View style={styles.cardMargin}>
          <Pressable
            style={styles.header}
            onPress={() => {
              setElevatorExpanded((prev) => !prev);
            }}
          >
            <Text lightColor="white" darkColor="white" bold>
              Elevator
            </Text>
            <Ionicons
              name={elevatorExpanded ? "caret-up" : "caret-down"}
              size={18}
              color="white"
            />
          </Pressable>
          <View style={[styles.cardDetail, !elevatorExpanded && styles.hide]}>
            {elevatorsList}
          </View>
        </View>
      )}
      {parkingsList.length > 0 && (
        <View style={styles.cardMargin}>
          <Pressable
            style={styles.header}
            onPress={() => {
              setParkingExpanded((prev) => !prev);
            }}
          >
            <Text lightColor="white" darkColor="white" bold>
              Parking
            </Text>
            <Ionicons
              name={parkingExpanded ? "caret-up" : "caret-down"}
              size={18}
              color="white"
            />
          </Pressable>
          <View style={[styles.cardDetail, !parkingExpanded && styles.hide]}>
            {parkingsList}
          </View>
        </View>
      )}
      {toiletsList.length > 0 && (
        <View style={styles.cardMargin}>
          <Pressable
            style={styles.header}
            onPress={() => {
              setToiletExpanded((prev) => !prev);
            }}
          >
            <Text lightColor="white" darkColor="white" bold>
              Toilet
            </Text>
            <Ionicons
              name={toiletExpanded ? "caret-up" : "caret-down"}
              size={18}
              color="white"
            />
          </Pressable>
          <View style={[styles.cardDetail, !toiletExpanded && styles.hide]}>
            {toiletsList}
          </View>
        </View>
      )}
      {rampsList.length > 0 && (
        <View style={styles.cardMargin}>
          <Pressable
            style={styles.header}
            onPress={() => {
              setRampExpanded((prev) => !prev);
            }}
          >
            <Text lightColor="white" darkColor="white" bold>
              Ramp
            </Text>
            <Ionicons
              name={rampExpanded ? "caret-up" : "caret-down"}
              size={18}
              color="white"
            />
          </Pressable>
          <View style={[styles.cardDetail, !rampExpanded && styles.hide]}>
            {rampsList}
          </View>
        </View>
      )}
      {doorsList.length > 0 && (
        <View style={styles.cardMargin}>
          <Pressable
            style={styles.header}
            onPress={() => {
              setDoorExpanded((prev) => !prev);
            }}
          >
            <Text lightColor="white" darkColor="white" bold>
              Door
            </Text>
            <Ionicons
              name={doorExpanded ? "caret-up" : "caret-down"}
              size={18}
              color="white"
            />
          </Pressable>
          <View style={[styles.cardDetail, !doorExpanded && styles.hide]}>
            {doorsList}
          </View>
        </View>
      )}
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#597EF7",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
  },
  cardMargin: {
    marginBottom: 32,
  },
  cardDetail: {
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  hide: {
    display: "none",
  },
});
