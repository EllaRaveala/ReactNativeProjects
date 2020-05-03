import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    FlatList
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');

export default function App() {
    const [product,
        setProduct] = useState('');
    const [amount,
        setAmount] = useState('');
    const [items,
        setItems] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists shoppingList (id integer primary key not null, produc' +
                    't text, amount text);');
        });
        updateList();
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into shoppingList (product, amount) values (?, ?);', [product, amount]);
        }, null, updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from shoppingList;', [], (_, {rows}) => setItems(rows._array));
        });
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql(`delete from shoppingList where id = ?;`, [id]);
        }, null, updateList)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textinput}
                placeholder='Product'
                onChangeText={product => setProduct(product)}
                value={product}/>
            <TextInput
                style={styles.textinput}
                placeholder='Amount'
                onChangeText={amount => setAmount(amount)}
                value={amount}/>
            <View style={styles.button}>
                <Button onPress={saveItem} title="SAVE"/>
            </View>
            <Text style={styles.header}>Shopping List</Text>
            <FlatList
                data={items}
                keyExtractor={item => item
                .id
                .toString()}
                renderItem={({item}) => 
                <View style={styles.list}>
                    <Text>{item.product}, {item.amount}</Text>
                    <Text
                        style={{color: "blue"}}
                        onPress={() => deleteItem(item.id)}>
                        bought
                    </Text>
                </View>}/>
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
    textinput: {
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 1
    },
    button: {
        margin: 5
    },
    header: {
        marginTop: 15,
        fontSize: 18,
        marginBottom: 10
    },
    list: {
        flexDirection: "row",
        minWidth: '40%',
        maxWidth: '80%',
        justifyContent: "space-between"
    }
});
