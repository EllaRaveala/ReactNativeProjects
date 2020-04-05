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
    const [item,
        setItem] = useState('');
    const [data,
        setData] = useState([]);

    const add = () => {
        setData([
            ...data, {
                key: item
            }
        ]);
    }

    const clear = () => {
      setData('');
  }

    return (
        <View style={styles.container}>
            <TextInput
                style={{
                width: 200,
                borderColor: 'gray',
                borderWidth: 1
            }}
                onChangeText={text => setItem(text)}
                value={item}/>
            <View style={styles.buttons}>
                <Button style={styles.button} onPress={add} title="ADD"/>
                <Button style={styles.button} onPress={clear} title="CLEAR"/>
            </View>
            <FlatList
                style={styles.flatlist}
                data={data}
                renderItem={({item}) => <Text>{item.key}</Text>}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '30%'
    },
    buttons: {
        flexDirection: "row",
    }
});
