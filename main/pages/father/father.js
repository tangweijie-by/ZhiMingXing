// pages/father/father.js
let app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus1:false,
    focus2: false,
    focus3: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      RpxHeight: app.globalData.RpxHeight
    })
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

  _focus(event){
    this.setData({
      focus1: true
    })
  },
  _blur(event){
    if (event.detail.value===''){
      this.setData({
        focus1: false
      })
    }
  },
  _focus2(event) {
    this.setData({
      focus2: true
    })
  },
  _blur2(event) {
    if (event.detail.value === '') {
      this.setData({
        focus2: false
      })
    }
  },
  _focus3(event) {
    this.setData({
      focus3: true
    })
  },
  _blur3(event) {
    if (event.detail.value === '') {
      this.setData({
        focus3: false
      })
    }
  }
})