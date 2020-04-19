import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TextInput,
    Image,
} from 'react-native';

export default function App() {

    const [desc,
        setDesc] = useState('');
    const [recipies,
        setRecipies] = useState([]);

    getRecipies = () => {
        const url = 'http://www.recipepuppy.com/api/?i=' + desc;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setRecipies(data.results);
        }).catch((error) => {
            Alert.alert('Error', error);
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{
                marginLeft: "5%"
            }}
                keyExtractor={(item, index) => index.toString()}
                data={recipies}
                renderItem={({item}) => 
            <View style={styles.separator}>
                <Text>{item.title}</Text>
                <Image
                    style={{
                    width: 50,
                    height: 50
                }}
                    source={{
                    uri: item.thumbnail
                }}/>
            </View>}
            />
            <TextInput
                style={styles.input}
                value={desc}
                placeholder="Description"
                onChangeText={(desc) => setDesc(desc)}/>
            <Button title="Find" onPress={getRecipies}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 30
    },
    input: {
        fontSize: 18,
        width: 200
    },
    separator: {
        flex: 1, 
        borderBottomWidth:1,
        borderBottomColor: 'grey'
       },
});
