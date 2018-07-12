const querystring = require('querystring');
const zomato = require('../shared/zomatoApi.js');
const location = require('../shared/location');

const surprise = (request, response) => {

  const sharedParams = {
    lat: location.lat,
    lon: location.lon,
    radius: 1610,
    count: 20,
    sort: 'real_distance',
  }

  const getRestaurantsWithOffset = offset => zomato.get(`search?${querystring.stringify({...sharedParams, start: offset})}`);

  Promise.all([
    getRestaurantsWithOffset(0),
    getRestaurantsWithOffset(20),
    getRestaurantsWithOffset(40),
  ]).then(([ ...responses ]) => {
      const unfilteredRestaurants = responses.reduce((list, response) => [...list, ...response.data.restaurants], []);

      const blacklistedCuisines = ['Drinks Only', 'Bar Food', 'Cafe', 'Ice Cream'];
      const outBlacklistedCuisines = location => !blacklistedCuisines.includes(location.restaurant.cuisines);

      const restaurants = unfilteredRestaurants.filter(outBlacklistedCuisines);
      const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)].restaurant;

      return response.status(200)
        .send({
          "response_type": "in_channel",
          "attachments": [
            {
              "color": "FF0080",
              "title": restaurant.name,
              "title_link": restaurant.url,
              "text": restaurant.location.address,
              "footer": "Chosen at Random!",
              "thumb_url": restaurant.thumb,
            },
          ],
        });
    })
    .catch(error => response.send({ error }));
};

module.exports = surprise;
