import Vue from 'vue'

//カンマ区切り
Vue.filter('price', (v) => {
  return "￥" + v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

//文字省略
Vue.filter('truncate', (v, amount) => {
  if ((v || '').length <= amount) {
    return v
  }
  return v.substring(0, amount) + '...'
})
