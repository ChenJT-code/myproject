'use strict';
const Controller = require('egg').Controller;
class getUserList extends Controller {
  async getUserList() {
    try {
      const {
        app,
        ctx
      } = this;
      const pro = app.mysql.get('pro');
      const userList = await pro.query('select * from userInfo order by userID asc');
      ctx.body = {
        code: 1,
        data: userList
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 0,
        msg: "查询失败"
      }
    }

  }

  async getUserInfo() {
    try {
      const {
        app,
        ctx
      } = this;
      const pro = app.mysql.get('pro');
      if (ctx.query && ctx.query.username) {
        let {
          username
        } = ctx.query
        const userInfo = await pro.query(`select * from userInfo where username = '${username}'`);
        ctx.body = {
          code: 1,
          data: userInfo
        };
      }
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 0,
        msg: "查询失败"
      }
    }

  }

}

module.exports = getUserList;