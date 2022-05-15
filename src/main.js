import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/css/common.css'
//导入ui组件库，按需引入
import {Form,FormItem,Input,Button,Message,Container,Aside,Main,Header,
Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,
TableColumn,Switch,Tooltip,Pagination,Dialog,MessageBox,Tag,Tree,Select,Option} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
//注册组件
Vue.use(Option)
Vue.use(Select)
Vue.use(Form)
Vue.use(Tree)
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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)

Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
