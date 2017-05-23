import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue'
// 引用路由配置文件
import routes from './config/routes'
// 引用API文件ps：模拟数据
import api from './config/api'
// 引入请求并处理响应
import VueResource from 'vue-resource'

import { Lazyload } from 'mint-ui'; /*lazyload使用*/
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.use(Lazyload);
console.log(routes);


// 使用vue-resource
Vue.use(VueResource)
// 使用路由
Vue.use(VueRouter)
// 使用配置文件规则
const router = new VueRouter({
  routes
})


// 安装vue事件
new Vue({
	router,
	el: '#app',
	render: (h) => h(App)
})

