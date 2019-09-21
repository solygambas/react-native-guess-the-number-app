import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>Game over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/success.png")}
          // source={{
          //   uri:
          //     "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/2017-10/success.jpg?itok=I-jXswy5"
          // }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.result}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userChoice}</Text>.
        </BodyText>
      </View>
      <MainButton onClick={props.onRestart}>PLAY AGAIN</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  },
  resultContainer: {
    marginHorizontal: 5,
    marginVertical: 5
  },
  result: {
    textAlign: "center",
    fontSize: 18
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  }
});

export default GameOverScreen;
