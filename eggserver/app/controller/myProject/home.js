'use strict';
const Controller = require('egg').Controller;
const parseString = require('xml2js').parseString;
class getWeather extends Controller {
  async getWeather() {
    try {
      const {
        app,
        ctx
      } = this;

      const result = await ctx.curl('http://wthrcdn.etouch.cn/WeatherApi', {
        method: "GET",
        headers: {
          "Accept-Language": "zh-CN",
          "Content-Type": "application/xml; charset=utf-8"
        },
        data: {
          city: "广州"
        },
        dataType: "text"
      })

      let json = "";
      parseString(result.data, {
        explicitArray: false,
        ignoreAttrs: true
      }, (err, res) => {
        json = res;
      })
      let data = {};
      if (json.resp.forecast) {
        data = {
          TypeDay: json.resp.forecast.weather[0].day.type,
          TypeNight: json.resp.forecast.weather[0].night.type,
          WeatherMsg: json.resp.forecast.weather[0].low.slice(3) + '~' + json.resp.forecast.weather[0].high.slice(3) + '，' + json.resp.zhishus.zhishu[6].detail,
        }
      }
      ctx.body = {
        code: 1,
        data:data
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 0,
        msg: "查询失败"
      }
    }

  }


}

module.exports = getWeather;