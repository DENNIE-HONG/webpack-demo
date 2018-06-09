const detailModel = require('../models/detailModel');
async function detailController (ctx, next) {
  try {
    let data = {};
    data.title = 'detail';
    data.id = ctx.params.id || '0';
    let detailList = await detailModel.detailList();
    console.log(detailList.data);
    ctx.render('detail.html', data);
  } catch (err) {
    console.log(err);
  }
};
module.exports = detailController;