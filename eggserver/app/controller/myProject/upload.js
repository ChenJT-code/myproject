'use strict';
const Controller = require('egg').Controller;
class upload extends Controller {
  async uploadImg() {
    try {
      const {
        app,
        ctx
      } = this;
      let stream = await ctx.getFileStream();
      console.log('111111111111111111', stream);
      const pro = app.mysql.get('pro');





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

}

module.exports = upload;