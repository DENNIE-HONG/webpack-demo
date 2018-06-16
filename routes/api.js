const apiController = require('../controllers/apiController');
const apiRoute = (router) => {
  router.post('/api/send', apiController.postForm);
  router.get('/api/send-jsonp', apiController.sendJsonp);
};
module.exports = apiRoute;