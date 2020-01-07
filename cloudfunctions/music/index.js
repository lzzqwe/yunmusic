// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
const TcbRouter = require('tcb-router')


const BASE_URL = 'http://www.icci.top'
cloud.init()

// 云函数入口函数  歌单查询云函数  
/**
 * 1.一个用户最多可以创建50个云函数
 * 2.相似的请求归类到同一个云函数处理
 * 3.tcb-router是一个koa风格的云函数路由库
 */
exports.main = async (event, context) => {
/*
event 包含了调用端（小程序端）调用该函数时传过来的参数，
同时还包含了可以通过 getWXContext 方法获取的用户登录态 `openId` 
和小程序 `appId` 信息
*/
  const app = new TcbRouter({ event });
  
  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('createTime', 'desc')//逆序
      .get()
      .then((res) => {
        return res
      })
  })


  app.router('musiclist', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId)).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('musicUrl', async(ctx, next) => {
    ctx.body = await rp(BASE_URL + `/song/url?id=${event.musicId}`).then((res) => {
      return res
    })
  })

  app.router('lyric', async(ctx, next) => {
    ctx.body = await rp(BASE_URL + `/lyric?id=${event.musicId}`).then((res) => {
      return res
    })
  })

  return app.serve();

  // return await cloud.database().collection('playlist')
  //   .skip(event.start)
  //   .limit(event.count)
  //   .orderBy('createTime', 'desc')//逆序
  //   .get()
  //   .then((res) => {
  //     return res
  //   })


}