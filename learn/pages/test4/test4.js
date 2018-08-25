// pages/test4/test4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moment: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
  
    wx.request({
      url: 'http://tp5x.com/index.php/index/index/test?page=1',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        that.setData({
          moment: res.data.list,
          page: 1
        });
        // 设置数组元素
        // that.setData({
        //   moment: that.data.moment
        // });
        console.log(that.data.moment);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
   
    // 页数+1
    var page = that.data.page + 1;

    wx.request({
      url: 'http://tp5x.com/index.php/index/index/test?page=' + page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {

        // 回调函数
        var moment_list = that.data.moment;

        for (var i = 0; i < res.data.list.length; i++) {
          moment_list.push(res.data.list[i]);
        }
        // 设置数据
        that.setData({
          moment: that.data.moment,
          page: page++
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

})