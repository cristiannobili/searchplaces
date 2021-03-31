import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

import { SearchScreen } from './Views/SearchScreen.js';
import { DetailScreen } from './Views/DetailScreen.js';
import { FavoritesScreen } from './Views/FavoritesScreen.js';
import { HomeScreen } from './Views/HomeScreen.js';
import { clientService } from "./Services/ClientService";
import { StorageService } from "./Services/StorageService";
import store from "./Business/store";
import middleware from "./Business/middleware";
import config from "./config.js";

const getData = clientService(config.key);
middleware(store, getData, new StorageService());
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
export default function App() {    
   return (
      <NavigationContainer style={styles.container}>
         <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Search" component={SearchScreen}
               initialParams={{ store: store }} options={{ title: 'Search' }} />
            <Stack.Screen name="Detail" component={DetailScreen}
               initialParams={{ store: store }} />
            <Stack.Screen name="Favorites" component={FavoritesScreen}
               initialParams={{ store: store }} options={{ title: 'Favorites' }} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#d1e0f0',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      fontSize: 15
   }
});