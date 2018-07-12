const axios = require('axios');
const apikey = 'c81fa3cb975c77a636dbd5118a7c04d9';

const agent = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1/',
  headers: {
    'user-key': apikey,
    'Content-Type': 'application/json',
  },
  validateStatus: status => status >= 200 && status < 300,
});

module.exports = agent;
