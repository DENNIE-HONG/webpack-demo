const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const chalk = require('chalk');
const serve = require('koa-static-server')
const app = new Koa();
const router = new Router();
const log = console.log;
render(app, {
  root: path.resolve(__dirname, 'code/dist'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});
//静态资源
// app.use(serve({
//   rootDir: path.resolve(__dirname, 'code/dist')
// }));
router.get('/detail', (ctx, next) => {
  ctx.render('detail.html');
});
app.use(router.routes())
   .use(router.allowedMethods());
// app.use('/detail', async (ctx)=>{
//   await ctx.render('detail.html');
// });
app.listen(8888);
log(chalk.blue('open http://localhost:8888'));
app.on('error', (err, ctx)=> {
  log(chalk.red(err));
});