const zomato = require('../shared/zomatoApi.js');
const location = require('../shared/location');

const getCollections = () => zomato.get(`collections?lat=${location.lat}&lon=${location.lon}`).then(({ data }) => data.collections.map(({ collection }) => ({ id: collection.collection_id, title: collection.title })));

const collectionSearch = (request, response, collectionId) => {
  zomato.get(`search?lat=${location.lat}&lon=${location.lon}&collection_id=${collectionId}&radius=1610&count=25&sort=real_distance`)
    .then(({ data }) => response.status(200).send({ list: data.restaurants.map(({ restaurant }) => restaurant.name) }))
    .catch(error => response.send({ error }));
};

module.exports = { getCollections, collectionSearch };
