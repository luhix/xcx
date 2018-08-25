Page({
  data: {
    isLoading: false,
    page: 1,
    isMore: true,
    videoList: [],
  },
  // 页面加载事件
  onShow: function (options) {
    this.refresh()
  },
  // 刷新方法
  refresh() {
    if (this.data.isLoading) {
      return
    }
    this.data.page = 1
    this.data.isMore = true
    this.data.videoList = []
    this.getVideoList()
  },
  // 加载更多方法
  loadMore() {
    if (this.data.isLoading) {
      return
    }
    if (this.data.isMore == false) {
      return
    }
    this.data.page += 1
    this.getVideoList()
  },
  // 从服务器获取视频列表数据
  getVideoList() {
    wx.showLoading({
      title: '玩命加载中',
    })

    this.data.isLoading = true
    wx.showNavigationBarLoading()
    wx.request({
      url: "http://tp5x.com/index.php/index/index/test",
      method: 'GET',
      data: {
        page: this.data.page
      },
      header: {
      },
      complete: res => {
        this.data.isLoading = false
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.statusCode == 200) {
          if (this.data.page == res.data.totalpage) {
            this.data.isMore = false
          }

          this.setData({
            videoList: this.data.videoList.concat(res.data.list)
          })

          // 隐藏加载框
          wx.hideLoading();

          // 这里的pagination参数是该项目接口中的分页数据
       
        }
      }
    })
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    this.refresh()
  },
  // 上拉加载事件
  onReachBottom: function () {
    
    if (this.data.isMore == false) {
      wx.showToast({
        title: '没有数据了'
      })
    }

    this.loadMore()
  }
})