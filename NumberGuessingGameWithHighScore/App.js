import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    AsyncStorage
} from 'react-native';

export default function App() {

    const [guess,
        setGuess] = useState('');
    const [random] = useState(Math.floor(Math.random() * 100) + 1);
    const [message,
        setMessage] = useState('Guess a number between 1-100');
    const [count,
        setCount] = useState(0);
    const [highscore,
        setHighScore] = useState(0);

    const checkAnswer = () => {

        setCount(count + 1);

        if (guess > random) {
            setMessage(`Your guess ${guess} is too high`);
        } else if (guess < random) {
            setMessage(`Your guess ${guess} is too low`);
        } else if (guess == random) {
            setMessage('');
            Alert.alert('You guessed the number in ' + count + ' guesses');
            parseInt(highscore);
            parseInt(count);
            if (highscore == 0 || count < highscore) {
                setHighScore(count);
                addToAsyncStorage();
            }
        }
    }
    addToAsyncStorage = async() => {
        try {
            await AsyncStorage.setItem('highScore', JSON.stringify(count));
        } catch (error) {
            Alert.alert('Error saving data');
        }
    }

    readAsyncStorage = async() => {
        try {
            let readValue = await AsyncStorage.getItem('highScore');
            if (readValue == null) {
                setHighScore(0);
            } else {
                JSON.parse(readValue);
                setHighScore(readValue);
            }
        } catch (error) {
            Alert.alert('Error reading data');
        }
    }

    useEffect(() => {
        readAsyncStorage();
    }, []);

    return (
        <View style={styles.container}>
            <Text>{message}</Text>
            <TextInput
                style={styles.textinput}
                onChangeText={text => setGuess(text)}
                value={guess}></TextInput>
            <Button onPress={checkAnswer} title='Make a guess'></Button>
            <Text>Highscore: {highscore} guesses</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '40%',
        marginBottom: '40%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textinput: {
        width: 50,
        borderColor: 'gray',
        borderWidth: 1
    }
});