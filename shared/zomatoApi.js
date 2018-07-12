const axios = require('axios');
const router = require('express').Router();
const location = require('./location');

const apikey = 'c81fa3cb975c77a636dbd5118a7c04d9';

const agent = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1/',
  headers: {
    'user-key': apikey,
    'Content-Type': 'application/json',
  },
  validateStatus: status => status >= 200 && status < 300,
});

router.get('/surprise', (request, response) => {
  agent.get(`search?lat=${location.lat}&lon=${location.lon}&radius=1610&count=25&sort=real_distance`)
    .then(({ data }) => {
      const randomRestro = data.restaurants[Math.floor(Math.random() * data.restaurants.length)];
      return response.status(200)
        .send({
          surprise: randomRestro.restaurant.name,
        });
    })
    .catch(error => response.send({ error }));
});

module.exports = router;
