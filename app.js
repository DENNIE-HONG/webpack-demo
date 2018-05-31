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
const app = new Koa();
const router = new Router();
const log = console.log;

const detail = require('./routes/detail');
//模板设置
render(app, {
  root: __dirname + '/views',
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

//路由
router.get('/detail', detail);
app.use(serve('/', __dirname + '/code/dist'))
   .use(router.routes())
   .use(router.allowedMethods());

app.listen(8888);
log(chalk.blue('open http://localhost:8888'));
app.on('error', (err, ctx)=> {
  log(chalk.red(err));
});