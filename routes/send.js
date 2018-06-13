const sendController = require('../controllers/sendController');
function sendRoute (router) {
  router.get('/send', sendController);
}
module.exports = sendRoute;