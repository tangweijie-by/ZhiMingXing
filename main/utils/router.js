/*
  处理路由的跳转
*/

//创建一个映射关系

const routerPath = {
  "welcome2": "/pages/welcome2/welcome2"
}

module.exports = {
  push(path,option={}){
    if(typeof path === 'string'){
      option.path = path  
    }else{
      option = path
    }
    //获取url
    let url = routerPath[option.path]
    
    let { query = {}, opentype='' } = option;
    let params = this.parse(query)
    if(params){
      url +='?' + params
    }
    this.to(opentype,url)
  },
  parse(data){
    let arr = []
    for(let key in data){
      arr.push(key +'=' +data[key])
    }
    return arr.join('&')
  },

  to(opentype,url){
    let obj = { url }
    
    if (opentype === 'redirect'){
      wx.redirectTo(obj)
    } else if (opentype === 'reLaunch'){
      wx.reLaunch(obj)
    }else if (opentype === 'back'){
      wx.navigateBack({
        delta:1
      })
    }else{
      
      wx.navigateTo(obj)
    }
  }
}