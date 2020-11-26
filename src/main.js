import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design-vue.js'
import '@/assets/css/common.css'
import '@/assets/font/font.css'
import echarts from 'echarts'
import $ from 'jquery'
import { axios, http, postAxios} from './commonjs/common'
import common from './js/common.js' // 公共方法
import socket from './js/websocket'
import "video.js/dist/video-js.css"
import G6 from '@antv/g6'


Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$http = http
Vue.prototype.$postAxios = postAxios
Vue.prototype.$echarts = echarts
Vue.prototype.$common = common
Vue.prototype.$socket = socket

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
