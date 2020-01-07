// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   wx.cloud.callFunction({
  //     name: 'login'
  //   }).then((res) => {
  //     console.log(res)
  //     this.setData({
  //       openid: res.result.openid
  //     })
  //   })

  // },
  onLoad: function() {
    //形成互相依赖的关系 js中的回调低于 每个任务都有互相依赖
    // setTimeout(() => {
    //   console.log("1")
    //   setTimeout(() => {
    //     console.log("2")
    //     setTimeout(() => {
    //       console.log("3")
    //       setTimeout(() => {
    //         console.log("4")
    //       }, 1000)
    //     }, 1000)
    //   }, 1000)
    // }, 1000)
    // new Promise((resolve,reject) => {
    //    setTimeout(() => {
    //     //  resolve将promise的状态从未完成变成成功,在异步操作成功的结果将作为参数传过去
    //     // resolve将promise的状态从未完成变成失败,在异步操作失败的结果将作为参数传过去
    //      resolve('1')
    //     // reject("sds")
    //    },1000)
    // }).then((res) =>{
    //     console.log(res)
    // }).catch((err) => {
    //   console.log(err)
    // })


    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('1')
        resolve("的")
      }, 1000)
    })
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('2')
        resolve("ddwe")
      }, 1000)
    })
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('3')
        resolve("s")
      }, 1000)
    })

    // p1.then(() => {
    //   return p2
    // }).then(() => {
    //   return p3
    // })

    Promise.all([p1, p2, p3]).then((res) => {
      console.log("任务全部完成")
      console.log(res)
    }).catch((err) => {
      console.log("任务失败")
      console.log(err)
    })

    // Promise.race([p1, p2, p3]).then((res) => {
    //   console.log("任务完成")
    //   console.log(res)
    // }).catch((err) => {
    //   console.log("任务失败")
    //   console.log(err)
    // })
    // this.foo().then((res) => {
    //   console.log(res)
    // })

    // this.timeOut()

    // this.foo()

  },
  // async foo() {
  //   console.log("foo")
  //   let res = await this.timeOut()
  //   console.log(res)
  // },

  // timeOut() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("1")
  //       resolve('resolve')
  //     }, 1000)
  //   })
  // },
  getMusicInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'music'
      },
    }).then((res) => {
      console.log(res)
    })
  },
  getMovieInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      }
    }).then((res) => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


})