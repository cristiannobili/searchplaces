import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
   text: {
      fontSize: 10,
      padding: 5
   },
   textBold: {
      fontSize: 13,
      fontWeight: 'bold'
   },
   image: {
      width: 120,
      height: 100
   },
   item: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      alignSelf: "center",
      width: "95%",
      margin: 5,
      padding: 10,
      backgroundColor: "#FFF",
   },
   centralViewItem: {
      alignItems: "center",
      padding: 5,
      flex: 1
   },
   button: {
      backgroundColor: '#87b6e6',
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,
      height: 40,
      width: 70,
      justifyContent: "center",
      alignItems: "center"
   },
   textButton: {
      fontSize: 18
   }
});

export function Item({ item, navigation, showDelete, showSave }) {
   return (
      <TouchableOpacity style={styles.item}
         onPress={() => { navigation.navigate("Detail", { item: item, showDelete: showDelete, showSave: showSave }) }} >
         <Image source={{ uri: item.imageUrl }} style={styles.image} />
         <View style={styles.centralViewItem}>
            <Text style={styles.textBold}>{item.name}</Text>
            <Text style={styles.text}>{item.address}</Text>
         </View>
         <View>
         </View>
      </TouchableOpacity>
   )
}