exports.postForm = (ctx, next) => {
  try {
    let postData = {};
    if (ctx.request.body.name == '') {
      ctx.body = {
        code: 201,
        msg: '请输入名字'
      };
      return;
    } 
    if (ctx.request.body.mobile == '') {
      ctx.body = {
        code: 201,
        msg: '请输入手机号'
      };
      return;
    }
    postData.name = ctx.request.body.name;
    postData.mobile = ctx.request.body.mobile;
    ctx.cookies.set('name', postData.name, {
      path: '/send'
    });
    ctx.body = {
      code: 200,
      msg: ''
    };
  } catch (err) {
    ctx.throw(err);
  }
};