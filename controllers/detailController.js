function detailController (ctx, next) {
  try {
    let data = {};
    data.title = 'detail';
    data.id = ctx.params.id || '0';
    ctx.render('detail.html', data);
  } catch (err) {
    console.log(err);
  }
};
module.exports = detailController;