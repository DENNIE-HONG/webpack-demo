const apiController = require('../controllers/apiController');
const apiRoute = (router) => {
  router.get('/api/send', apiController.postForm);
};
module.exports = apiRoute;