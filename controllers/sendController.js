const sendController = (ctx, next) => {
  try {
    let data = {};
    data.title = 'send';
    data.userName = ctx.cookies.get('name');
    ctx.render('send.html', data);
  } catch (err) {
    ctx.throw(err);
  }
};
module.exports = sendController;