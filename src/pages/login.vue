<template id="app">
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>Welcome</div>
                <div>This website is for management of user account</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">Welcome back</h2>
            <div>
                <span></span>
                <span>Username and password for login</span>
                <span></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="Enter your username">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="Enter your password" show-password>
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">Login</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref,reactive, onMounted, onBeforeUnmount } from 'vue'
import { login} from '~/api/manager'
import { toast } from '~/composables/utils'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
// do not use same name with ref
const form = reactive({
    username: "",
    password: ""
})

const rules = {
    username:[
        { 
            required: true, 
            message: 'username not allowed empty', 
            trigger: 'blur' 
        },
    ],
    password:[
        { 
            required: true, 
            message: 'password not allowed empty', 
            trigger: 'blur' 
        },
    ]
}
const formRef = ref(null)
const loading =ref(false)

const onSubmit = () => {
    formRef.value.validate((valid)=>{
        if(!valid){
            return false
        }
        loading.value=true
        login(form.username,form.password)
        .then(res=>{
            // console.log(res)
            toast('Login Succeed')

            //token
            // const cookie = useCookies()
            // cookie.set("admin-token",res.token)

            //route to backend system
            router.push("/")
        }).finally(()=>{
            loading.value=false
        })
    })
}

//listen event of Enter to onclick
function onKeyUp(e){
    if(e.key == "Enter") onSubmit()
}
onMounted(()=>{
    document.addEventListener("keyup",onKeyUp)
})
onBeforeUnmount(()=>{
    document.removeEventListener("keyup",onKeyUp)
})

</script>

<style scoped>
.login-container{
    @apply min-h-screen bg-indigo-500;
}
.login-container .left,.login-container .right{
    @apply flex items-center justify-center;
}
.login-container .right{
    @apply bg-light-50 flex-col;
}
.left>div>div:first-child{
    @apply font-bold text-5xl text-light-50 mb-4;
}
.left>div>div:last-child{
    @apply text-gray-200 text-sm;
}
.right .title{
    @apply font-bold text-3xl text-gray-800;
}
.right>div{
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line{
    @apply h-[1px] w-16 bg-gray-200;
}
</style>