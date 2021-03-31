export const clientService = (key) => {

   const searchUrlTemplate = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%SEARCH%&key=" + key;
   const photoUrlTemplate = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=%ID%&key=" + key;
   const mapUrlTemplate = "https://maps.googleapis.com/maps/api/staticmap?center=%ADDRESS%&zoom=15&size=500x300&maptype=roadmap&markers=color:red%7Clabel:%NAME%7C%LAT%,%LON%&key=" + key;
   
   return async (what, where) => {
      const query = what + "+in+" + where;
      const searchUrl = searchUrlTemplate.replace("%SEARCH%", query);
      try {
         let response = await fetch(searchUrl);
         let data = await response.json();
         const result = data.results
            .filter((element) => element.photos)
            .map((element) => {
                  const photoQuery = photoUrlTemplate.replace("%ID%", element.photos[0].photo_reference);
                  const mapQuery = mapUrlTemplate
                     .replace("%ADDRESS%", element.formatted_address)
                     .replace("%NAME%", element.name)
                     .replace("%LAT%", element.geometry.location.lat)
                     .replace("%LON%", element.geometry.location.lon);
                  return {
                     id: element.place_id,
                     name: element.name,
                     address: element.formatted_address,
                     imageUrl: photoQuery,
                     mapUrl: mapQuery
                  }
            });
         return result;
      } catch (e) {
         console.error(e);
      }
   }

}; 