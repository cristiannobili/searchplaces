import AsyncStorage  from "@react-native-community/async-storage"
export class StorageService {  

   async clear() {
      await this.write("favorites", []);
      console.log("New length: 0");
      return true; 
   }
   
   async add(element) {
      console.log("Called for id:" + element.id);
      const list = await this.read("favorites") || [];            
      list.push(element);      
      await this.saveList(list);  
   }

   async getList() {
      const list = await this.read("favorites") || [];      
      return list;
   }

   async saveList(list) {
      await this.write("favorites", list);
   }

   async write(key, value) {
      try {
         await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
         );
      } catch (error) {
         console.log(error);
      }
   }

   async read(key) {
      try {         
         const result = await AsyncStorage.getItem(key);
         if (result) {
            return JSON.parse(result);
         } else {
            return [];
         }
      } catch (error) {
         console.log(error);
      }
   }


}