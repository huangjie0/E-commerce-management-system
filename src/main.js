import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/css/common.css'
//导入ui组件库，按需引入
import {Form,FormItem,Input,Button,Message,Container,Aside,Main,Header,Menu,Submenu,MenuItem} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
//注册组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.prototype.$message=Message

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
