import { spacingY } from "@/constants/theme";
import { HeaderProps } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftIcon}>{leftIcon}</View>
      {title && (
        <Typo size={22} fontWeight={"600"} style={styles.title}>
          {title}
        </Typo>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  leftIcon: {
    position: "absolute",
    top: spacingY._5,
  },
  title: {
    textAlign: "center",
    flex: 1,
  },
});
