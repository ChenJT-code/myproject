'use strict';
module.exports = appInfo => {
  const config = exports = {};
  config.secret = 'user'; //签名
  config.expiresIn = 60 * 60 * 2, //token有效期
    config.cluster = {
      listen: {
        path: '',
        port: 7001,
        hostname: '0.0.0.0', // 0.0.0.0
      }
    }

  config.middleware = ['tokenAuthentication'];

  config.mysql = {
    clients: {
      // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
      db1: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'a123456',
        database: 'mysql',
      },
      pro: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'a123456',
        database: 'myproject',
      },
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    }
  }

  //解决前端请求跨域问题
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };


  return {
    ...config
  }
};