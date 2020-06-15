/*
  

  1.基本的请求信息
  2.为了方便后续数据处理，promise处理：fetch axios给予promise
  3.对获取数据的状态处理：loading toast
  4.对请求头的处理！！！
  

*/


let store = require("../utils/store.js")
let system = store.getSystemInfo();




const clientInfo = {
  'clientType' : 'wx',
  'appName':'stzbHelper',
  'brand':system.brand,  
  'model':system.model,
  'os':system.system,
  'screen': system.screenWidth + 'x' + system.screenHeight,
  'version':App.version,
  'chennel':"miniprogram",
  
}

module.exports = {
  fetch : (url,data = {},option = {}) =>{
    let { loading = true,toast = true,method='get' } = option
    return new Promise((resolve,reject) =>{
      if(loading){
        wx.showLoading({
          title: '加载中...',
          mask:true
        })
      }
      let env = App.config.baseApi
      wx.request({
        url: env + url,
        data,
        method,
        header: {
          'clientInfo': JSON.stringify(clientInfo),
          'token': store.getItem('token')
        },
        success: function (result) {
          let res = result.data  
          console.log(result)
          if (result.statusCode == 200) {
            
            if(loading){
              wx.hideLoading()
            }
            resolve(res)
          }else{
            if(toast){
              wx.showToast({
                title: '错误:'+result.statusCode,
                mask:true,
                icon :'none'
              })
            }else{
              wx.hideLoading()
            }
          }
        },
        fail: function(e = {code:-1,msg:errMsg,errMsg}){
            let msg = e.errMsg
            if(msg = "request fail timeout"){
              msg = "请求超时,请稍后再试"
            }
            wx.showToast({
              title: msg,
              icon: "none"
            })
            reject(e)
        }
      })
    })
  },
  getAuthorization:(options,callback)=>{
    wx.request({
      method: 'GET',
      url: env + url, // 服务端签名，参考 server 目录下的两个签名例子
      dataType: 'json',
      success: function (result) {
        var data = result.data;
        var credentials = data && data.credentials;
        if (!data || !credentials) return console.error('credentials invalid');
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
        });
      }
    });
  }
  
}