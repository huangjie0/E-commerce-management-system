import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
import login from './modules/login'
export default new vuex.Store({
    modules:{
        login
    }
})