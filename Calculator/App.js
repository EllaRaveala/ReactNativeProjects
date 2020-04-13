import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Button, Text} from 'react-native';

export default function App() {

    const [number1,
        setNumber1] = useState(0);
    const [number2,
        setNumber2] = useState(0);
    const [result,
        setResult] = useState('');

    const increase = () => {
        setResult((parseInt(number1)) + (parseInt(number2)));
    }

    const decrease = () => {
        setResult((parseInt(number1)) - (parseInt(number2)));
    }

    return (
        <View style={styles.container}>
            <Text>Result: {result}</Text>
            <TextInput
                style={{
                width: 200,
                borderColor: 'gray',
                borderWidth: 1
            }}
                onChangeText={number => setNumber1(number)}
                value={number1}/>
            <TextInput
                style={{
                width: 200,
                borderColor: 'gray',
                borderWidth: 1
            }}
                onChangeText={number => setNumber2(number)}
                value={number2}/>
            <Text>{"\n"}</Text>
            <View style={styles.buttons}>
                    <Button onPress={increase} title="+"/>
                    <Button onPress={decrease} title="-"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons:{
        width: '20%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'

    }
});
