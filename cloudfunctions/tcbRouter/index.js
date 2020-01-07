// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  app.use(async (ctx, next) => {
    ctx.data = {};
    await next(); // 执行下一中间件
  });

  // 路由为字符串，该中间件只适用于 user 路由
  app.router('music', async (ctx, next) => {
    ctx.data.name = 'heyli';
    await next(); // 执行下一中间件
  }, async (ctx, next) => {
    ctx.data.sex = 'male';
    await next(); // 执行下一中间件
  }, async (ctx) => {
    ctx.data.city = 'Foshan';
    // ctx.body 返回数据到小程序端
    ctx.body = { code: 0, data: ctx.data };
  });

  // 路由为字符串，该中间件只适用于 user 路由
  app.router('movie', async (ctx, next) => {
    ctx.data.name = 'heyli';
    await next(); // 执行下一中间件
  }, async (ctx, next) => {
    ctx.data.sex = 'male';
    await next(); // 执行下一中间件
  }, async (ctx) => {
    ctx.data.city = 'Foshan';
    // ctx.body 返回数据到小程序端
    ctx.body = { code: 0, data: ctx.data };
  });

  return app.serve()

}