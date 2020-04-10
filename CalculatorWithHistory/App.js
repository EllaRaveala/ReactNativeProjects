import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    FlatList
} from 'react-native';

export default function App() {
    const [number1,
        setNumber1] = useState(0);
    const [number2,
        setNumber2] = useState(0);
    const [result,
        setResult] = useState('');
    const [data,
        setData] = useState([]);

    const increase = () => {
        setResult((parseInt(number1)) + (parseInt(number2)));
        setData([
            ...data, {
                key: String(data.length), text: number1 + ' + ' + number2 + ' = ' + ((parseInt(number1)) + (parseInt(number2)))
            }
        ]);
    }

    const decrease = () => {
        setResult((parseInt(number1)) - (parseInt(number2)));
        setData([
            ...data, {
                key: String(data.length), text:number1 + ' - ' + number2 + ' = ' + ((parseInt(number1)) - (parseInt(number2)))
            }
        ]);
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
                keyboardType='number-pad'
                onChangeText={number => setNumber1(number)}
                value={number1}/>
            <TextInput
                style={{
                width: 200,
                borderColor: 'gray',
                borderWidth: 1
            }}
                keyboardType='number-pad'
                onChangeText={number => setNumber2(number)}
                value={number2}/>
            <View style={styles.buttons}>
                <Button style={styles.button} onPress={increase} title="+"/>
                <Button style={styles.button} onPress={decrease} title="-"/>
            </View>
            <FlatList
                style={styles.flatlist}
                data={data}
                renderItem={({item}) => <Text>{item.text}</Text>}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30%'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
