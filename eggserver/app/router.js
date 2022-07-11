'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/index', controller.test.index);
  router.get('/test/:id', controller.test.test);
  router.post('/test1', controller.test.test1);


  //  vue项目接口
  // 登录
  router.post('/getToken', controller.myProject.getToken.getToken);
  // 首页
  router.get('/getWeather', controller.myProject.home.getWeather);
  // 日志
  router.get('/getpageData', controller.myProject.blog.getpageData);
  router.post('/uploadData', controller.myProject.blog.uploadData);
  router.post('/registUser', controller.myProject.blog.registUser);
  // 用户信息
  router.get('/getUserList', controller.myProject.user.getUserList);
  router.get('/getUserInfo', controller.myProject.user.getUserInfo);
  // 图片上传
  router.post('/uploadImg', controller.myProject.upload.uploadImg);
};