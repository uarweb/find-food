const zomato = require('../shared/zomatoApi.js');
const location = require('../shared/location');

const surprise = (request, response) => {
  zomato.get(`search?lat=${location.lat}&lon=${location.lon}&radius=1610&count=25&sort=real_distance`)
    .then(({ data }) => {
      const randomRestro = data.restaurants[Math.floor(Math.random() * data.restaurants.length)];
      return response.status(200)
        .send({
          surprise: randomRestro.restaurant.name,
        });
    })
    .catch(error => response.send({ error }));
};

module.exports = surprise;
