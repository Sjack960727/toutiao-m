import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入icon
import '@/assets/fonts/iconfont.css'
// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入适配
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
