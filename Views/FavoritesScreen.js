import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'

import {Item } from '../Views/Item';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#d1e0f0',
      justifyContent: 'center',
      fontSize: 15
   },   
});

export function FavoritesScreen({ route, navigation }) {
   const [list, setList] = useState([]);
   const {store} = route.params;

   useEffect(() => {      
      let subscription;
      if (list.length === 0) {         
         subscription = store.addSubscriber((state) => {            
            setList(state.favorites);                          
         })
      }      
      store.dispatch("loadFavorites");
      return () => {
         store.removeSubscriber(subscription);
      }
   }, []);

   return (
      <SafeAreaView style={styles.container}>
         <FlatList style={{ flex: 1 }}
            data={list}
            renderItem={({ item }) => {
               return (
                  <Item item={item} navigation={navigation} showDelete={true} />
               )
            }}
            keyExtractor={item => item.id}
         />
      </SafeAreaView>
   )

}
