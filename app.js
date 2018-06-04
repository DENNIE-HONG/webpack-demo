/**
 * webpack-demo-server
 * @author luyanhong 2018.05
*/
const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const chalk = require('chalk');
const serve = require('koa-static2')
const logger = require('koa-logger')
const indexRoute = require('./routes'); //引入路由
const app = new Koa();
const router = new Router();
const log = console.log;
const PORT = 8888;
//模板设置
render(app, {
  root: __dirname + '/views',
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
//路由
indexRoute(router);
app.use(logger())
   .use(serve('/', __dirname + '/code/dist'))
   .use(router.routes())
   .use(router.allowedMethods());

app.listen(PORT, () =>{
  log(chalk.blue(`open http://localhost:${PORT}`));
});

app.on('error', (err, ctx)=> {
  log(chalk.red(err));
});
