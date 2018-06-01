const detailRoute = require('./detail');
const homeRoute = require('./home');
const route = (router) => {
  detailRoute(router);
  homeRoute(router);
}
module.exports = route;
