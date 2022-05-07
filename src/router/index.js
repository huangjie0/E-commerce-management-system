import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path:'/login',
            component:Login
        },
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/home',
            component:Home
        }
    ]
    
})
//挂载路由导航守卫
router.beforeEach((to, from, next)=>{
    //to代表访问的路径
    //from代表从哪里来的
    //next()直接放行
    if(to.path==='/login') return next();
    const tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr) return next('/login')
    next()
})
export default router
