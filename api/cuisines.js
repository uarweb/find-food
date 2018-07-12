const zomato = require('../shared/zomatoApi.js');
const location = require('../shared/location');

const getCuisines = () => zomato.get(`cuisines?lat=${location.lat}&lon=${location.lon}`).then(({ data }) => data.cuisines.map(({ cuisine }) => cuisine));

const cuisineSearch = (request, response, cuisineId) => {
  zomato.get(`search?lat=${location.lat}&lon=${location.lon}&cuisines=${cuisineId}&radius=1610&count=25&sort=real_distance`)
    .then(({ data }) => response.status(200).send({ list: data.restaurants.map(({ restaurant }) => restaurant.name) }))
    .catch(error => response.send({ error }));
};

module.exports = { getCuisines, cuisineSearch };
