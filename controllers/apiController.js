exports.postForm = (ctx, next) => {
  try {
    let postData = ctx.request.body;
    if (postData.name == '') {
      ctx.body = {
        code: 201,
        msg: '请输入名字'
      };
      return;
    } 
    if (postData.mobile == '') {
      ctx.body = {
        code: 201,
        msg: '请输入手机号'
      };
      return;
    }
    ctx.body = {
      code: 200,
      msg: ''
    };
  } catch (err) {
    ctx.throw(err);
  }
};