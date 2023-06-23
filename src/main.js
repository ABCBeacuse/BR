import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as MapTalks from "maptalks"
import 'maptalks/dist/maptalks.css'
import './assets/icon-font/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$MapTalk = MapTalks;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
