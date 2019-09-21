import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import DefaultStyles from "../constants/default-styles";
import Number from "../components/Number";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomNumber(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert(
        "Don't bluff!",
        "Help your opponent to find the right answer...",
        [{ text: "Sorry!", style: "cancel" }]
      );
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    // setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    setPastGuesses(curPastGuesses => [
      nextNumber.toString(),
      ...curPastGuesses
    ]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <Number>{currentGuess}</Number>
      <Card style={styles.buttonContainer}>
        <MainButton onClick={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onClick={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((value, index) =>
            renderListItem(value, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: 400,
    maxWidth: "90%",
    justifyContent: "space-around",
    marginTop: 20
  },
  listContainer: {
    flex: 1,
    width: "60%"
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end"
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default GameScreen;
