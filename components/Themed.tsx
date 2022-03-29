/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView,
  SafeAreaView,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"] & { bold?: boolean };
export type ViewProps = ThemeProps & DefaultView["props"];
export type ContainerProps = ThemeProps & SafeAreaView["props"];
export type ScrollContainerProps = ThemeProps & ScrollView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, bold, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[
        {
          color,
          fontFamily: bold ? "roboto-bold" : "roboto",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function ScrollContainer(props: ScrollContainerProps) {
  const { style, lightColor, darkColor, children, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <ScrollView
      style={[{ backgroundColor, flex: 1, paddingHorizontal: 24 }, style]}
      {...otherProps}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </ScrollView>
  );
}

// use this component at every screen
export function Container(props: ContainerProps) {
  const { style, lightColor, darkColor, children, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView style={[{ backgroundColor, flex: 1 }, style]} {...otherProps}>
      <DefaultView style={{ paddingHorizontal: 24 }}>{children}</DefaultView>
    </SafeAreaView>
  );
}
