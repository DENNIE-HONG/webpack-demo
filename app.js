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
const axios = require('axios');
const log = console.log;
const PORT = 8888;

require('dnscache')({
  "enable" : true
});
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers['Accept-Encoding'] = 'gzip, deflate';
//模板设置
render(app, {
  root: __dirname + '/views',
  extname: '.html'
});
//路由
indexRoute(router);
// 404

app.use(logger())
   .use(serve('/', __dirname + '/code/dist'))
   .use(router.routes())
   .use(router.allowedMethods())

// app.use(async (ctx) => {
//   ctx.status = 404;
//   ctx.response.body = 'Page not found!';
// });
app.listen(PORT, () =>{
  log(chalk.blue(`open http://localhost:${PORT}`));
});
//错误处理
app.on('error', (err, ctx) => {
  log(chalk.red(err));
});
