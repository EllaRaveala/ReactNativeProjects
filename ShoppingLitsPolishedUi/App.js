import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Input, Button, ListItem, Header} from 'react-native-elements';

export default function App() {
    const [product,
        setProduct] = useState('');
    const [amount,
        setAmount] = useState('');
    const [items,
        setItems] = useState([]);

    const db = SQLite.openDatabase('coursedb.db');

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

    const renderListItem = ({item}) => (<ListItem
        topDivider
        title={item.product}
        subtitle={item.amount}
        rightTitle='Bought'
        bottomDivider
        chevron
        onPress={() => deleteItem(item.id)}/>)

    return (
        <View style={styles.container}>
            <Header
                centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff', fontSize: 15 } }}
                containerStyle={{height: '10%', alignItems:'baseline', marginBottom: 30, backgroundColor: 'blue'}}
                style={styles.header}/>
            <Input
                style={styles.textinput}
                placeholder='Product'
                label='PRODUCT'
                onChangeText={product => setProduct(product)}
                value={product}/>
            <Input
                style={styles.textinput}
                placeholder='Amount'
                label='AMOUNT'
                onChangeText={amount => setAmount(amount)}
                value={amount}/>
            <View style={styles.button}>
                <Button raised buttonStyle={{backgroundColor:'gray', height:50}}  onPress={saveItem} title="SAVE"/>
            </View>
            <FlatList
                contentContainerStyle={{
                marginTop: 30
            }}
                keyExtractor={item => item
                .id
                .toString()}
                data={items}
                renderItem={renderListItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    textinput: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        margin: 1
    },
    button: {
        width: '100%',
        fontSize: 20,
        margin: 5
    },
    header: {
        color: 'white',
        height: 20,
        fontSize: 18,
        marginBottom: 10
    }
});