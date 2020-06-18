import {
  request
} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuLish:[],
    // 右侧的商品数据
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex:0,
    // 右侧内容的滚动条据顶部额距离
    scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 先判断一下本地存储中有没有旧数据
    // {time:DataCue.now(),data:[...]}
    // 没有就数据，直接发送请求
    // 有旧数据，同时旧数据没有过期，就使用本地存储中的数据即可
    const Cates = wx.getStorageSync('Cates');
    if(!Cates){
      this.getCates()
    }else{
      // 有旧数据 定义过期时间
      if(Date.now() - Cates.time>1000*10){
        // 旧数据时间过期
        // 重新发送请求
        this.getCates()
      }else{
        this.Cates = Cates.data
        let leftMenuLish = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuLish,
          rightContent
        })
      }

    }
     
  },
  //获取分类数据
  getCates(){
    request({url:"/categories"})
    .then(res=>{
        this.Cates=res.data.message;
        // 把接口的数据存到本地存储里
        wx.setStorageSync('Cates', {time:Date.now(),data:this.Cates});
        // 构造左侧的大菜单数据
        let leftMenuLish = this.Cates.map(v=>v.cat_name);
        //  构造右侧商品数据
      let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuLish,
          rightContent
        })
    })
  },
  // 左侧选择栏点击事件
  handleTtemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置scroll-view标签滑动条距离顶部的距离
      scrollTop:0
    })
  }
})