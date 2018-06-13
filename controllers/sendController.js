const sendController = (ctx, next) => {
  try {
    let data = {};
    data.title = 'send';
    ctx.render('send.html');
  } catch (err) {
    ctx.throw(err);
  }
};
module.exports = sendController;