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
const bodyParser = require('koa-bodyparser');
const jsonp = require('koa-jsonp');
const app = new Koa();
const router = new Router();
const axios = require('axios');
const spdy = require('spdy');
const fs = require('fs');
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
   .use(bodyParser())
   .use(jsonp())
   .use(async ( ctx, next) => {
    if ( ctx.url === '/send' && !ctx.cookies.get('name')) {
      ctx.cookies.set('name', '', {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/send',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长         
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      })    
    }
    await next();
  })
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

const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt')
};
// app.listen(PORT, () =>{
//   log(colors.green(`open http://localhost:${PORT}`));
// });
// //错误处理
// app.on('error', (err, ctx) => {
//   log(colors.red(err));
// });
spdy.createServer(options, app.callback())
    .listen(PORT, ()=>{
      log(colors.green(`open http://localhost:${PORT}`));
    })
    .on('error', (err, ctx) => {
      log(colors.red(err));
    });