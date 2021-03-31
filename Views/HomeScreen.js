
import React, { useState, useLayoutEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Button, TextInput, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#d1e0f0',
      fontSize: 15,
   },
   formContainer: {
      height: 200,      
      backgroundColor: '#d1e0f0',
      fontSize: 15,
   },
   textInput: {
      height: 40,
      padding: 10,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: '#fff',
      fontFamily: "Verdana",
      fontSize: 18,
      borderRadius: 5
   },
   block: {      
      padding: 5,
      height: 50
   },
   button: {      
      backgroundColor: '#87b6e6',
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,
      color: "#de0b00",
      height: 50
   },
   text: {
      fontSize: 20,
      textAlign: 'center',
      padding: 10,
      fontFamily: "Verdana"
   }
});

export function HomeScreen({ navigation }) {
   const [what, onChangeWhat] = useState('');
   const [where, onChangeWhere] = useState('');

   useLayoutEffect(() => {
      navigation.setOptions({         
            headerRight: () => (
               <Button
                  title="Preferiti"
                  onPress={() => { navigation.navigate("Favorites") }} />)         
      })
   }, [navigation]);

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.formContainer}>
            <View style={styles.block}>
               <TextInput style={styles.textInput}
                  placeholder="what you need"
                  onChangeText={text => onChangeWhat(text)}
                  value={what}
               />
            </View>
            <View style={styles.block}>
               <TextInput style={styles.textInput}
                  placeholder="where you need"
                  onChangeText={text => onChangeWhere(text)}
                  value={where}
               />
            </View>
            <View style={styles.block}>
               <TouchableOpacity style={styles.button}
                  onPress={() => {
                     navigation.navigate("Search",
                        {
                           what: what,
                           where: where
                        })
                  }} >
                  <Text style={styles.text}>
                     {"Go to " + what + " in " + where}
                  </Text>
               </TouchableOpacity>
            </View>
         </View>

      </SafeAreaView>
   )
}