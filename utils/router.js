/*
  处理路由的跳转
*/

//创建一个映射关系

const routerPath = {
  "myinfo":"/pages/myinfo/myinfo/myinfo",
  "index":"/pages/index/index/index",
  "ranklist":"/pages/ranklist/ranklist/ranklist",
  "analysis":"/pages/analysis/analysis/analysis",
  "adtm":"/pages/index/adtm/adtm",
  "examine":"/pages/index/examine/examine",
  "reward":"/pages/index/reward/reward",
  "refer":"/pages/index/refer/refer",
  "taskexa":"/pages/index/taskexa/taskexa",
  "creatrole": "/pages/myinfo/creatrole/creatrole",
  "changerole":"/pages/myinfo/changerole/changerole",
  "creatleague": "/pages/index/creatleague/creatleague",
  "search": "/pages/index/search/search",
  "leaguemanage": "/pages/myinfo/leaguemanage/leaguemanage",
  "editgroup": "/pages/myinfo/editgroup/editgroup",
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