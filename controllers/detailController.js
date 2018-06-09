const detailModel = require('../models/detailModel');
async function detailController (ctx, next) {
  try {
    let data = {};
    data.title = 'detail';
    data.id = ctx.params.id || '0';
    let detailList = await detailModel.detailList();
    data.detailList = detailList.data.collections;
    ctx.render('detail.html', data);
  } catch (err) {
    ctx.throw(err);
  }
};
module.exports = detailController;