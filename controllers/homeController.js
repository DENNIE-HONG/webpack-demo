const homeController = (ctx, next) => {
  try {
    let data = {};
    data.title = 'home';
    ctx.render('home.html');
  } catch (err) {
    ctx.throw(err);
  }
};
module.exports = homeController;