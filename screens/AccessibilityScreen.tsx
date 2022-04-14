import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { DoorDetail } from "../components/DoorDetail";
import { ElevatorDetail } from "../components/ElevatorDetail";
import { ParkingDetail } from "../components/ParkingDetail";
import { RampDetail } from "../components/RampDetail";

import { ScrollContainer, Text } from "../components/Themed";
import { ToiletDetail } from "../components/ToiletDetail";
import { ElevatorType, MainStackScreenProps, RampType } from "../types";

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

  const elevatorsList = elevators.map((item) => {
    return (<ElevatorDetail
      // passable
      location={item.located.length > 0 ? item.located : "-"}
      button={item.switch ? "Switch" : "No Usable Switch"}
      remark={item.remark.length ? item.remark : "-"}
      key={"e"+item.id}
    />)
  });

  const parkingsList = parkings.map((item) => {
    return (<ParkingDetail
      key={"p"+item.id}
      location={item.located.length > 0 ? item.located : "-"}
      floor={item.floor.length > 0 ? item.floor : "-"}
      door={item.nearEntry ? "Near entry" : "Not near entry"}
      car={item.enoughSpace ? "Available (vacant)": "Not available"}
      remark={item.remark.length > 0 ? item.remark : "-"}
    />)
  });

  const toiletsList = toilets.map((item) => {
    return (
      <ToiletDetail
        key={"t"+item.id}
        location={item.located.length > 0 ? item.located : "-"}
        floor={item.floor.length > 0 ? item.floor : "-"}
        type={item.type.length > 0 ? item.type: "-"}
        door={item.doorType.length > 0 ? item.doorType: "-"}
        handrail={item.handrail ? "Handrail" : "No handrail"}
        remark={item.remark.length > 0 ? item.remark : "-"}
      />
    )
  });

  const rampsList = {};

  const doorsList = doors.map((item) => {
    return (
      <DoorDetail
        key={"d"+item.id}
        location={item.located.length > 0 ? item.located : "-"}
        floor={item.floor.length > 0 ? item.floor : "-"}
        door={item.doorType.length > 0 ? item.doorType: "-"}
        remark={item.remark.length > 0 ? item.remark : "-"}
      />
    )
  });;


  return (
    <ScrollContainer>
      <Text style={styles.title} bold>
        Accessibilities
      </Text>
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
          {/* <ElevatorDetail
            location="Near parking and toilet"
            button="Switch"
            remark="The door is 80 cm wide"
          /> */}
          {elevatorsList}
        </View>
      </View>
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
          {/* <ParkingDetail
            location="In the back of the mall"
            floor="flat"
            door="Near entry"
            car="Available (vacant)"
            remark="No disabled parking, but has valet service"
          /> */}
          {parkingsList}
        </View>
      </View>
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
          {/* <ToiletDetail
            location="Location description + link"
            floor="flat"
            type="type"
            door="Near entry"
            handrail="handrail"
            remark="No disabled parking, but has valet service"
          /> */}
          {toiletsList}
        </View>
      </View>
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
          <RampDetail
            location="Location description + link"
            floor="flat"
            slope="slope"
            level="level"
            handrail="handrail"
            remark="No disabled parking, but has valet service"
          />
        </View>
      </View>
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
          {/* <DoorDetail
            location="Location description + link"
            floor="flat"
            door="door"
            accessibility="accessibility"
            remark="No disabled parking, but has valet service"
          /> */}
          {doorsList}
        </View>
      </View>
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
