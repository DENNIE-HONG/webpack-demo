const detailController = require('../controllers/detailController');
function detailRoute (router) {
  router.get('/detail/:id?', detailController);
}
module.exports = detailRoute;