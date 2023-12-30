// 导入我们已经配置好的 axios 实例
import service from '~/axios'
import {getCSRFToken} from '~/composables/auth'

const userApi = {
  // 获取所有用户
  getUsers() {
    return service.get('/users')
  },

  // 添加用户
  addUser(data) {
    const csrf_token = getCSRFToken()
    return service.post('/adduser', data,{
        headers: {
        'x-csrf-token': csrf_token
        }
    })
  },

  // 编辑用户
  editUser(id, data) {
    const csrf_token = getCSRFToken()
    return service.put(`/edit/${id}`, data,{
        headers: {
            'x-csrf-token': csrf_token
            }
    })
  },

  // 删除用户
  deleteUser(id) {
    const csrf_token = getCSRFToken()
    return service.delete(`/delete/${id}`,{
        headers: {
            'x-csrf-token': csrf_token
            }
    })
  }
  
}

export default userApi