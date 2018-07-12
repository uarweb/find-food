const zomato = require('../shared/zomatoApi.js');
const location = require('../shared/location');

const surprise = (request, response) => {
  zomato.get(`search?lat=${location.lat}&lon=${location.lon}&radius=1610&count=25&sort=real_distance`)
    .then(({ data }) => {
      const restaurant = data.restaurants[Math.floor(Math.random() * data.restaurants.length)].restaurant;
      return response.status(200)
        .send({
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
