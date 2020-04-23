// pages/playlist/playlist.js
const MAX_LIMIT = 15

Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: [],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        playlist: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this._getSwiper()
        this._getPlayList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    _getSwiper() {
        wx.cloud.callFunction({
            name: 'music',
            data: {
                $url: "swiper"
            }
        }).then((res) => {
            if (res.result.code === 200) {
                this.setData({
                    background: res.result.banners
                })
            }
        })
    },
    _getPlayList() {
        wx.showLoading({
                title: '加载中',
            })
            //请求云函数
        wx.cloud.callFunction({
            name: 'music',
            data: {
                start: this.data.playlist.length,
                count: MAX_LIMIT,
                $url: "playlist"
            }
        }).then((res) => {
            this.setData({
                playlist: this.data.playlist.concat(res.result.data)
            })
            wx.stopPullDownRefresh()
            wx.hideLoading()
        })
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
     * 下拉刷新在json中开启
     */
    onPullDownRefresh: function() {
        this.setData({
            playlist: []
        })
        this._getPlayList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this._getPlayList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})