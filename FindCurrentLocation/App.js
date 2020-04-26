import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

    const [address,
        setAddress] = useState('');
    const [lat,
        setLat] = useState(0);
    const [lng,
        setLng] = useState(0);
    const [location,
        setLocation] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async() => {
        //Check permission
        let {status} = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to access location');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            setLat(location.coords.latitude);
            setLng(location.coords.longitude);
        }
    };

    const getLatLng = () => {
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=wnWpWDsCGO14Mdv7ezLejGa6Y3wL' +
                '7CjX&location=' + address).then((response) => response.json()).then((data) => {
            setLat(data.results[0].locations[0].latLng.lat);
            setLng(data.results[0].locations[0].latLng.lng);
        }).catch((error) => {
            Alert.alert('Error', error);
        });
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.004757,
                longitudeDelta: 0.0033299
            }}><Marker
                coordinate={{
            latitude: lat,
            longitude: lng
        }}
                title={address}/>
            </MapView>
            <TextInput
                style={styles.textinput}
                onChangeText={text => setAddress(text)}
                value={address}
                placeholder='Address here, e.g. "Ratapihantie 13, Helsinki, Finland" '></TextInput>
            <View style={styles.button}>
                <Button onPress={getLatLng} title='SHOW'></Button>
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
    map: {
        flex: 1,
        width: '100%',
        height: '50%'

    },
    textinput: {
        fontSize: 15,
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        marginBottom: 10
    },
    button: {
        width: '100%',
        marginBottom: 30
    }
});
