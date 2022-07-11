const jwt = require('jsonwebtoken');
const whiteLis = require('../../config/whiteListConfig.js') //路由白名单
module.exports = (options, app) => {
  return async function tokenAuthentication(ctx, next) {
    try {
      // 如果存在白名单里的路由 不需要验证token
      if (whiteLis.indexOf(ctx.request.url)>-1) {
        await next();
        return;
      }
      let token = ctx.header.token;
      if (token) {
        let {
          secret,
          expiresIn
        } = app.config
        // const playload = jwt.decode(token);
        let ok = true;
        // const playload1 = jwt.verify(token, secret); //解密
        jwt.verify(token, secret, (err, decoded) => {
          if (err) { //如果token过期或解析错误则会执行err的代码块
            console.log('token认证信息失败');
            ctx.body = {
              code: 10010,
              msg: "token令牌失效或已过期,请重新登录！"
            };
            ok = false;
          } else {
            const isExpries = decoded.exp * 1000 - new Date().getTime()
            // console.log(`token过期时间 还有${isExpries / 1000}秒`)
          }
        })
        if (ok) await next()
      } else {
        ctx.logger.info("token令牌非法!");
        ctx.body = {
          code: 0,
          msg: "token令牌非法!"
        }
      }
    } catch (error) {
      console.log('error', error);

    }



  };
};