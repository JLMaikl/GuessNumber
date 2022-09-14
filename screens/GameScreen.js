import { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';

import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

import Title from '../components/ui/Title';

const generateRandomBetween = (min, max, exlude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exlude) {
    return generateRandomBetween(min, max, exlude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber }) => {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const nextGuesshandler = (direction) => {

    if (
      (direction === 'lower' && currentGuess < userNumber) || 
      (direction === 'greater' && currentGuess > userNumber)
      ){
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
          { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;      
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title style={styles.title}>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuesshandler.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuesshandler.bind(this, 'greater')}>+</PrimaryButton>
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 36,
  },
});
