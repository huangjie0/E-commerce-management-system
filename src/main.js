import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/css/common.css'
//导入ui组件库，按需引入
import {Form,FormItem,Input,Button,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
//注册组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.prototype.$message=Message

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
