const zomato = require('../shared/zomatoApi.js');
const location = require('../shared/location');

const getCollections = () => zomato.get(`collections?lat=${location.lat}&lon=${location.lon}`).then(({ data }) => data.collections.map(({ collection }) => ({ id: collection.collection_id, title: collection.title })));

const collectionSearch = (request, response, collectionId) => {
  zomato.get(`search?lat=${location.lat}&lon=${location.lon}&collection_id=${collectionId}&radius=1610&count=5&sort=real_distance`)
    .then(({ data }) => response.status(200).send({ 
      "response_type": "in_channel",
      "attachments": data.restaurants.map(({ restaurant }) => ({
        "title": restaurant.name,
        "title_link": restaurant.url,
        "text": restaurant.location.address,
        "footer": restaurant.user_rating.rating_text,
        "color": restaurant.user_rating.rating_color,
      }))
    }))
    .catch(error => response.send({ error }));
};

module.exports = { getCollections, collectionSearch };
