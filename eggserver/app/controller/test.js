'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, CJT';
  }


  async test() {
    const { app,ctx } = this;

    const db1 = app.mysql.get('db1');
    const db2 = app.mysql.get('db2');
    // console.log(ctx.params)
    // let {id} = ctx.params
    // let str =  await ctx.service.test.find(id);
    // const post = await app.mysql.get('testname', { id: 1 });
    // let sql = 'select * from testname'
    let sql = `update testname set name = '陈伟'`
    const res1 = await db1.query(sql);
    console.log('res1',res1);
    
    const res2 = await db2.query('select * from phone');
    console.log('res2',res2);
    
    ctx.body = 1;
  }


  async test1(){
    const { app,ctx } = this;
    console.log(ctx.request)
    console.log(ctx.request.body)
    ctx.body = 12
  }


}



module.exports = HomeController;
