import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, Alert} from 'react-native';
import {Input, Button, ListItem} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

export default function Myplaces({navigation}) {

    const [address,
        setAddress] = useState('');
    const [addresses, setAddresses]= useState([]);

    const db = SQLite.openDatabase('addresses.db');

    //Luo osoitteet -taulun, mikäli sellaista ei ole tietokannassa
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists addresses (id integer primary key not null, address text);');
        });
        updateList();
    }, []);

    //Tallentaa osoitteen tietokantaan osoitteet -tauluun
    const saveAddress = () => {
        db.transaction(tx => {
            tx.executeSql('insert into addresses (address) values (?);', [address]);
        }, null, updateList)
    }

    //Asettaa tietokannan osoitteet muuttujaan
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from addresses;', [], (_, {rows}) => setAddresses(rows._array));
        });
    }

    //Poistaa osoitteen: "Alert" -ikkuna pomppaa kun käyttäjä painaa osoitetta klikkausta pidempään
    const deleteAddress = (id) => {
        Alert.alert(
            "Are you sure you want to delete address?",
            "Click Cancel/Yes",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => {db.transaction(tx => {
                tx.executeSql(`delete from addresses where id = ?;`, [id]);
            }, null, updateList)} }
            ],
            { cancelable: false }
          );
    }

    //Osoitteiden listaus
    const renderAddresses = ({item}) => (<ListItem
        topDivider
        title={item.address}
        rightTitle='Show on map'
        bottomDivider
        chevron
        onPress={() => navigation.navigate('Map',  {data: item.address})}
        onLongPress={() => deleteAddress(item.id)}
        />)

    return (
        <View style={styles.container}>
            <Input
                style={styles.textinput}
                placeholder='Type in address'
                label='PLACEFINDER'
                onChangeText={address => setAddress(address)}
                value={address}/>
            <Button title="SAVE" buttonStyle={{backgroundColor:'gray', height:50}} icon={{name: 'save', color: 'white'}} onPress={saveAddress}/>
            <FlatList
                contentContainerStyle={{
                marginTop: 30
            }}
                keyExtractor={item => item
                .id
                .toString()}
                data={addresses}
                renderItem={renderAddresses}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20
    },
    textinput: {
        width: '100%'
    }
});
