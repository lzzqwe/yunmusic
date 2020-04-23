// components/blog-card/blog-card.js
import formatTime from '../../utils/formatTime.js'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        blog: Object
    },
    /**
     * 数据监听器支持监听属性或内部数据的变化，可以同时监听多个。
     * 一次 setData 最多触发每个监听器一次。
     * 
     *  */
    observers: {
        ['blog.createTime'](val) {
            if (val) {
                // console.log(val)
                this.setData({
                    _createTime: formatTime(new Date(val))
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _createTime: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPreviewImage(event) {
            const ds = event.target.dataset
            wx.previewImage({
                urls: ds.imgs,
                current: ds.imgsrc,
            })
        },
    }
})