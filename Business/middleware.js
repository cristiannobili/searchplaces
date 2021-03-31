export default (store, getData, storageService) => {

   const dataLoadedReducer = (state, payload) => {
      return { ...state, list: payload.list }
   }

   const favoritesLoadedReducer = (state, payload) => {
      return { ...state, favorites: payload.favorites }
   }

   const searchDataEffect = (state, payload) => {
      getData(payload.what, payload.where).then((data) => {
         store.dispatch("search_completed", { list: data })
      })
   }

   const addFavoriteEffect = (state, payload) => {
      const exists = state.favorites && state.favorites.filter((item) => item.id === payload.item.id);
      if (!exists || exists.length === 0) {
         console.log("Adding favorite");
         storageService.add(payload.item).then(() => {
            store.dispatch("loadFavorites");
         })
      }
   }

   const loadFavoritesEffect = (state, payload) => {
      storageService.getList().then((data) => {
         console.log(data);
         store.dispatch("load_completed", { favorites: data })
      })
   }

   const cleanFavoritesEffect = (state, payload) => {
      storageService.clear().then(() => {
         store.dispatch("loadFavorites");
      })
   }

   const deleteFavoriteEffect = (state, payload) => {
      const newFavorites = state.favorites.filter((item) => item.id !== payload.item.id);
      storageService.saveList(newFavorites).then(() => {
         store.dispatch("loadFavorites");
      })

   }

   store.addEffect("search", searchDataEffect);
   store.addEffect("addFavorite", addFavoriteEffect);
   store.addEffect("loadFavorites", loadFavoritesEffect);
   store.addEffect("cleanFavorites", cleanFavoritesEffect);
   store.addEffect("deleteFavorite", deleteFavoriteEffect);
   store.addReducer("search_completed", dataLoadedReducer);
   store.addReducer("load_completed", favoritesLoadedReducer);
}