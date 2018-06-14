const apiController = require('../controllers/apiController');
const apiRoute = (router) => {
  router.post('/api/send', apiController.postForm);
};
module.exports = apiRoute;