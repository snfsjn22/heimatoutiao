// 引入
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'

// 注册
Vue.use(Vant)

// 配置
Vue.config.productionTip = false

// 实例化
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
