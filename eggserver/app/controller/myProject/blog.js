'use strict';
const Controller = require('egg').Controller;
const moment = require('moment');
class getpageData extends Controller {
  async getpageData() {
    try {
      const {
        app,
        ctx
      } = this;
      const pro = app.mysql.get('pro');
      const pageList = await pro.query('select * from pageInfo order by uploadtime desc');
      pageList.forEach(v => {
        v.uploadTime = moment(v.uploadTime).format(
          'yyyy-MM-DD HH:mm:ss'
        );
      });
      ctx.body = {
        code: 1,
        data: pageList
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 0,
        msg: "查询失败"
      }
    }

  }

  async uploadData() {
    try {
      const {
        app,
        ctx
      } = this;
      // console.log(ctx.request.body)
      let {
        title,
        text
      } = ctx.request.body
      let uploadTime = this.getDayTimer(new Date())
      // console.log('时间', uploadTime);
      const pro = app.mysql.get('pro');
      await pro.query(`insert into pageInfo (title,text,uploadTime) value ('${title}', '${text}','${uploadTime}')`);
      ctx.body = {
        code: 1,
        msg: "上传成功"
      }
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 0,
        msg: "上传失败"
      }
    }
  }

  async registUser() {
    try {
      const {
        app,
        ctx
      } = this;
      console.log(ctx.request.body)
      let data = ctx.request.body
      let {
        username,
        password
      } = data
      console.log(username, password);
      const pro = app.mysql.get('pro');
      const hasUser = await pro.query(`select * from userinfo where username = '${username}'`);
      if (hasUser.length == 0) {
        await pro.query(`insert into userinfo (username,password) value ('${username}','${password}')`);
        ctx.body = {
          code: 1,
          msg: "注册成功"
        }
      } else {
        ctx.body = {
          code: 0,
          msg: "已存在该用户"
        }
      }



    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 0,
        msg: "注册失败"
      }
    }
  }

  getDayTimer(data) {
    var date = new Date(data);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var currentdate = y + "-" + m + "-" + d;
    var hh = date.getHours();
    hh = hh < 10 ? "0" + hh : hh;
    var mm = date.getMinutes();
    mm = mm < 10 ? "0" + mm : mm;
    var ss = date.getSeconds();
    ss = ss < 10 ? "0" + ss : ss;
    var time = hh + ":" + mm + ":" + ss;
    return currentdate + " " + time;
  }

}

module.exports = getpageData;