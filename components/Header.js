import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  headerIOS: {
    backgroundColor: "white"
  },
  title: {
    color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default Header;
