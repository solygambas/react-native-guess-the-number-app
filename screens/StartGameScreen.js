import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";

import Colors from "../constants/colors";
import Card from "../components/Card";
import Input from "../components/Input";
import Number from "../components/Number";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = textInput => {
    setEnteredNumber(textInput.replace(/[^0-9]/g, ""));
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", "Number has to be between 1 and 99", [
        { text: "OK", style: "destructive", onPress: resetInputHandler }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredNumber("");
    Keyboard.dismiss();
  };
  const resetInputHandler = () => {
    setEnteredNumber("");
    setConfirmed(false);
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedBox}>
        <Text>You selected</Text>
        <Number>{selectedNumber}</Number>
        <MainButton
          onClick={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.start}>
        <TitleText style={styles.title}>Start a new game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredNumber}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color={Colors.primary}
                onPress={confirmInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.accent}
                onPress={resetInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  start: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  confirmedBox: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGameScreen;
