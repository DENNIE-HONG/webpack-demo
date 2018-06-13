/**
 * webpack-demo-server
 * @author luyanhong 2018.05
*/
const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const colors = require('colors');
const serve = require('koa-static2')
const logger = require('koa-logger')
const indexRoute = require('./routes'); //引入路由
const helmet = require("koa-helmet");
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

app.use(logger())
   .use(serve('/', path.join(__dirname, '/code/dist')))
   .use(helmet({
    dnsPrefetchControl: false,
    hsts: false
   }))
   .use(router.routes())
   .use(router.allowedMethods())
   .use(async (ctx, next) => {
    try {
      await next();
      // 处理404
      if (ctx.status === 404) {
        ctx.body = "Hello 404 error!";
      }
    } catch (err) {
      // 处理500
      ctx.response.status = 500;
      ctx.throw(err);
    }
  });

app.listen(PORT, () =>{
  log(colors.green(`open http://localhost:${PORT}`));
});
//错误处理
app.on('error', (err, ctx) => {
  log(colors.red(err));
});
