import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#d1e0f0',
      alignItems: 'center',
      justifyContent: 'center',
   },
   innerContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: "95%",
      margin: 5,
      padding: 5,
   },
   text: {
      fontSize: 15,
      padding: 5
   },
   textBold: {
      fontSize: 20,
      fontWeight: 'bold'
   },
   title: {
      flex: 1,
      margin: 20,
      alignItems: 'center',
   },
   photo: {
      width: "95%",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 6,
   },
   photoMap: {
      width: "95%",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 4,
      margin: 10
   },
   address: {
      margin: 20,
      flex: 1
   },
   image: {
      alignSelf: 'stretch',
      flex: 1,
      width: undefined,
      height: undefined,
   },
   imageMap: {
      alignSelf: 'stretch',
      flex: 1,
      width: undefined,
      height: undefined,
   },
   buttonView: {
      flex: 1,
      margin: 30
   },
   buttonAdd: {
      backgroundColor: '#87b6e6',
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,      
      height: 50,      
      justifyContent: "center",
      alignItems: "center",      
      alignSelf: 'stretch',
      flexDirection: 'row',      
      padding: 10
   },
   buttonRemove: {
      backgroundColor: '#ff3356',
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,      
      height: 50,      
      justifyContent: "center",
      alignItems: "center",      
      alignSelf: 'stretch',
      flexDirection: 'row',      
      padding: 10
   },
   textButton: {      
      fontSize: 18,
      textAlign: "center"
   },

});

export function DetailScreen({ route }) {
   const { item, showSave, showDelete, store } = route.params;
   const [result, setResult] = useState("");
   console.log("Store id: " + store.id);

   const addToFavorites = async (item) => {      
      store.dispatch("addFavorite", {item: item});
      setResult("Saved!");      
   }

   const removeFavorite = async (item) => {      
      store.dispatch("deleteFavorite", {item: item});
      setResult("Saved!");      
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.innerContainer}>
            <View style={styles.photo}>
               <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.title}>
               <Text style={styles.textBold}>{item.name}</Text>
               <Text style={styles.text}>{item.address}</Text>
            </View>
            <View style={styles.photoMap}>
               <Image source={{ uri: item.mapUrl }} style={styles.imageMap} />
            </View>
            <View style={styles.buttonView}>
               {result === "" && showSave &&
                  <TouchableOpacity style={styles.buttonAdd}
                     onPress={() => addToFavorites(item)}>
                        <Text style={styles.textButton}>Aggiungi ai preferiti</Text>
                     </TouchableOpacity>
               }
               {result === "" && showDelete &&
                  <TouchableOpacity style={styles.buttonRemove}
                     onPress={() => removeFavorite(item)}>
                        <Text style={styles.textButton}>Rimuovi dai preferiti</Text>
                     </TouchableOpacity>
               }
               <Text style={styles.textButton}>{result}</Text>
            </View>
         </View>
      </SafeAreaView>
   )
}

