
import index from '../page/index/index.vue'
import detail from '../page/detail/detail.vue'

// 引入子路由
import userIndex from '../page/user/index.vue'
import userInfo from '../page/user/info.vue'
import userLove from '../page/user/love.vue'


// 配置路由
export default [
  {
	path: '/',
  name:'index',
	component: index,
            
  },
  {
	path: '/detail/:id',
  name:'detail',
	component: detail,
            children: [
                    {path: '/',component: userIndex},
                    {path: 'info',component: userInfo},
                    {path: 'love',component: userLove}
            ],
  },

]