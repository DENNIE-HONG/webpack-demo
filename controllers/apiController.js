exports.postForm = (ctx, next) => {
  try {
    let postData = {},
      returnData = {};
    if (ctx.request.body.name == '') {
      returnData = {
        code: 201,
        msg: '请输入名字'
      };
      ctx.body = returnData;
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
exports.sendJsonp = (ctx, next) => {
  try {
    let returnData = {};
    if (!ctx.request.query.address) {
      returnData = {
        code: 201,
        msg: '请输入地址'
      };
    } else {
      returnData = {
        code: 200,
        msg: ''
      };
    }
    ctx.body = returnData;
  } catch (err) {
    ctx.throw(err);
  }
}