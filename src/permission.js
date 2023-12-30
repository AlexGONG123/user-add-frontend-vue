import router from '~/router'
import { getCSRFToken } from '~/composables/auth'
import { toast } from '~/composables/utils'
import store from '~/store'
//navigation guide
router.beforeEach(async (to, from, next) => {
    const csrf_token = getCSRFToken()

    //not login, redirect to login page
    if(!csrf_token&&to.path!="/login"){
        toast("please login first","error")
        return next({path:"/login"})
    }

    //prevention for repeating login
    if(csrf_token && to.path == "/login"){
        toast("do not repeat login","error")
        return next({path:from.path?from.path:"/"})
    }

    // if admin user login, get user info and store in vuex
    if(csrf_token){
        await store.dispatch("getCurrentAdmin")
    }

    next()
})