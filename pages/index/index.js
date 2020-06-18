// 引入发送请求的代码
import {
  request
} from "../../request/index"
const app = getApp()

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    catesList:[],
    floorList:[]
  },
  onLoad: function () {
    this.getSwiperlList()
    this.getCatesList()
    this.getFoolrList()
  },
  // 获取轮播图数据
  getSwiperlList(){
 // 发送异步请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // })
    request({
      url: '/home/swiperdata'
    })
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取导航图片数据
  getCatesList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result.data.message
      })
    })
  },
  //获取楼层数据
  getFoolrList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  }

})
