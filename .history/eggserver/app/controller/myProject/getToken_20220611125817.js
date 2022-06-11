'use strict';
const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class getToken extends Controller {
  async getToken() {
    try {
      const {
        app,
        ctx
      } = this;
      // console.log(ctx.request.body)
      let data = ctx.request.body
      let {
        username,
        password
      } = data
      let reqState;
      //查找用户表
      const pro = app.mysql.get('pro');
      const userList = await pro.query('select * from userinfo');
      let {
        secret,
        expiresIn
      } = app.config
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].username == username && userList[i].password == password) {
          let accessToken = jwt.sign(data, secret, {
            expiresIn: expiresIn
          }); //生成token
          reqState = {
            code: 1,
            accessToken,
            msg: "获取成功"
          };
          ctx.body = reqState
          return
        } else {
          reqState = {
            code: 0,
            msg: "账户密码错误"
          };
        }
      }
      ctx.body = reqState
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 0,
        msg: "获取失败"
      }
    }
  }


}

module.exports = getToken;