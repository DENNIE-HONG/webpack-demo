const homeController = (ctx, next) => {
  try {
    let data = {};
    data.title = 'home';
    ctx.render('home.html');
  } catch (err) {
    console.log(err);
  }
};
module.exports = homeController;