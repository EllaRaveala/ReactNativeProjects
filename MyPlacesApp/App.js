import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Myplaces from './Myplaces';
import Map from './Map';

export default function App() {
  const Stack = createStackNavigator();

    return (
      <View style={styles.container}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="My Places" component={Myplaces}/>
                <Stack.Screen name="Map" component={Map}/>
            </Stack.Navigator>
        </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
})