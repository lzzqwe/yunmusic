// components/progress-bar/progress-bar.js
let movableAreaWidth = 0
let movableViewWidth = 0
    /*获取全局唯一的背景音频管理器。 小程序切入后台，
    如果音频处于播放状态，可以继续播放。
    但是后台状态不能通过调用API操纵音频的播放状态。
    */
const backgroundAudioManager = wx.getBackgroundAudioManager()
let currentSec = -1 // 当前的秒数
let duration = 0 // 当前歌曲的总时长，以秒为单位
let isMoving = false // 表示当前进度条是否在拖拽，解决：当进度条拖动时候和updatetime事件有冲突的问题

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isSame: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        showTime: {
            currentTime: '00:00', //当前时间
            totalTime: '00:00', //总时间
        },
        movableDis: 0, // x方向移动的距离
        progress: 0, //滚动条移动了多少
    },

    lifetimes: {
        ready() { //在组件在视图层布局完成后执行 
            if (this.properties.isSame && this.data.showTime.totalTime == '00:00') {
                this._setTime()
            }
            this._getMovableDis()
            this._bindBGMEvent()
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            // console.log(event)
            // 拖动  source表示当前移动产生的原因
            if (event.detail.source == 'touch') {
                this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
                this.data.movableDis = event.detail.x
                isMoving = true
                    // console.log('change', isMoving)
            }
        },
        onTouchEnd() {
            const currentTimeFmt = this._dateFormat(Math.floor(backgroundAudioManager.currentTime))
            this.setData({
                progress: this.data.progress,
                movableDis: this.data.movableDis,
                ['showTime.currentTime']: currentTimeFmt.min + ':' + currentTimeFmt.sec
            })
            backgroundAudioManager.seek(duration * this.data.progress / 100)
            isMoving = false
                // console.log('end', isMoving)
        }, //获取进度条宽度
        _getMovableDis() {
            //返回查询对象
            const query = this.createSelectorQuery()
                //
            query.select('.movable-area').boundingClientRect()
            query.select('.movable-view').boundingClientRect()
            query.exec((rect) => {
                // console.log(rect)
                movableAreaWidth = rect[0].width
                movableViewWidth = rect[1].width
                    // console.log(movableAreaWidth, movableViewWidth)
            })

        },

        _bindBGMEvent() {
            // 监听背景音频播放事件
            backgroundAudioManager.onPlay(() => {
                    console.log('onPlay')
                    isMoving = false
                    this.triggerEvent('musicPlay')
                })
                // 监听背景音频停止事件
            backgroundAudioManager.onStop(() => {
                    console.log('onStop')
                })
                // 监听背景音频暂停事件
            backgroundAudioManager.onPause(() => {
                console.log('Pause')
                this.triggerEvent('musicPause')
            })

            backgroundAudioManager.onWaiting(() => {
                    console.log('onWaiting')
                })
                // 监听背景音频进入可播放状态事件。 但不保证后面可以流畅播放
            backgroundAudioManager.onCanplay(() => {
                    console.log('onCanplay')
                        // console.log(backgroundAudioManager.duration)
                    if (typeof backgroundAudioManager.duration != 'undefined') {
                        this._setTime()
                    } else {
                        setTimeout(() => {
                            this._setTime()
                        }, 1000)
                    }
                })
                // 监听背景音频播放进度更新事件，只有小程序在前台时会回调。
            backgroundAudioManager.onTimeUpdate(() => {
                    // console.log('onTimeUpdate')
                    if (!isMoving) {
                        //当前播放的时间
                        const currentTime = backgroundAudioManager.currentTime
                            //总时长
                        const duration = backgroundAudioManager.duration
                            //格式化  栗子 2.475516
                        const sec = currentTime.toString().split('.')[0]
                        if (sec != currentSec) {
                            // console.log(currentTime)
                            const currentTimeFmt = this._dateFormat(currentTime)
                            this.setData({
                                    movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
                                    progress: currentTime / duration * 100,
                                    ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`,
                                })
                                //当前的秒数
                            currentSec = sec
                                // 联动歌词
                            this.triggerEvent('timeUpdate', {
                                currentTime
                            })
                        }
                    }
                })
                // 监听背景音频自然播放结束事件
            backgroundAudioManager.onEnded(() => {
                    console.log("onEnded")
                    this.triggerEvent('musicEnd')
                })
                // 监听背景音频播放错误事件
            backgroundAudioManager.onError((res) => {
                console.error(res.errMsg)
                console.error(res.errCode)
                wx.showToast({
                    title: '错误:' + res.errCode,
                })
            })
        },

        _setTime() {
            // 当前音频的长度（单位：s），只有在有合法 src 时返回。（只读）
            duration = backgroundAudioManager.duration
            const durationFmt = this._dateFormat(duration)
            this.setData({
                ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
            })
        },
        // 格式化时间
        _dateFormat(sec) {
            // 分钟
            const min = Math.floor(sec / 60)
            sec = Math.floor(sec % 60)
            return {
                'min': this._parse0(min),
                'sec': this._parse0(sec),
            }
        },
        // 补零
        _parse0(sec) {
            return sec < 10 ? '0' + sec : sec
        }
    }
})