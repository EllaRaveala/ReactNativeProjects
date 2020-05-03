import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function Map({route}) {

    const {data} = route.params;

    const [lat,
        setLat] = useState(60.201373);
    const [lng,
        setLng] = useState(24.934041);

    const showLocation = () => {
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=wnWpWDsCGO14Mdv7ezLejGa6Y3wL' +
                '7CjX&location=' + data).then((response) => response.json()).then((data) => {
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
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221
            }}>
                <Marker
                    coordinate={{
                    latitude: lat,
                    longitude: lng
                }}
                    title={data}/>
            </MapView >
            <View style={styles.button}>
                <Button onPress={showLocation} title="SHOW"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50
    },
    button: {
        width: '100%'
    },
    map: {
        flex: 1,
        width: '100%',
        height: '50%'
    }
});
