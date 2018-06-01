const detailRoute = require('./detail');
const homeRoute = require('./home');
const route = (router) => {
  router.get('/detail', detailRoute)
        .get('/', homeRoute);
}
module.exports = route;
