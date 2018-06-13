const detailRoute = require('./detail');
const homeRoute = require('./home');
const sendRoute = require('./send');
const apiRoute = require('./api');
const route = (router) => {
  detailRoute(router);
  homeRoute(router);
  apiRoute(router);
  sendRoute(router);
}
module.exports = route;
