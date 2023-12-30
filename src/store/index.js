import { createStore } from 'vuex'
import { login,getCurrentAdmin } from '~/api/manager'

// 创建一个新的 store 实例
const store = createStore({
    state () {
      return {
        admin:{}
      }
    },
    mutations: {
      SET_ADMININFO(state,admin){
        state.admin = admin
      }
    },
    actions: {
        //get current user info
        getCurrentAdmin({commit}){
            return new Promise((resolve,reject)=>{
                getCurrentAdmin().then(res=>{
                    commit("SET_ADMININFO",res)
                    resolve(res)
                }).catch(err=>reject(err))
            })
        }
    }
})

export default store

