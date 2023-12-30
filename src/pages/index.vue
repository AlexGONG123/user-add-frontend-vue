<!-- <template>
    <div>
        User add frontend
        {{ $store.state.admin }}
    </div>
</template>
<script setup>
    // import { useCookies } from '@vueuse/integrations/useCookies'
    // const cookie = useCookies()

    // console.log(cookie);
</script> -->

<template>
    <div class="container">
        <!-- 显示管理员信息 -->
        <div class="admin-info">
            <p>Logged in as: <strong>{{ $store.state.admin.username }}</strong></p>
        </div>

        <!-- 添加用户按钮 -->
        <el-button type="primary" @click="showAddUserDialog = true">Add User</el-button>
        <el-button @click="logout">Logout</el-button>
        <!-- 添加用户弹窗 -->
        <el-dialog title="Add User" v-model="showAddUserDialog" @close="resetForm">
            <el-form :model="userForm" :rules="userRules" ref="addUserForm">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="Gender" prop="gender">
                    <el-select v-model="userForm.gender" placeholder="Select">
                        <el-option label="Male" value="male"></el-option>
                        <el-option label="Female" value="female"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAddUserDialog = false">Cancel</el-button>
                <el-button type="primary" @click="addUser">Submit</el-button>
            </span>
        </el-dialog>

        <el-dialog title="Edit User" v-model="showEditUserDialog" @close="resetEditForm">
            <el-form :model="editUserForm" :rules="userRules" ref="editUserForm">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="editUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="Gender" prop="gender">
                    <el-select v-model="editUserForm.gender" placeholder="Select">
                        <el-option label="Male" value="male"></el-option>
                        <el-option label="Female" value="female"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showEditUserDialog = false">Cancel</el-button>
                <el-button type="primary" @click="editUser">Save</el-button>
            </span>
        </el-dialog>

        <!-- 用户列表 -->
        <el-table :data="users" style="width: 100%" :pagination.sync="pagination">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="username" label="Username"></el-table-column>
            <el-table-column prop="gender" label="Gender"></el-table-column>
            <el-table-column label="Actions">
                <template #default="{ row }">
                    <el-button size="small" @click="openEditDialog(row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="deleteUser(row.id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
        </el-pagination>
    </div>
</template>
  
<script>
import userApi from '~/api/user.js'
import { logout} from '~/api/manager'
import { toast } from '~/composables/utils'
import {removeCSRFToken,removeAccessTokenCookie} from '~/composables/auth'

export default {
    data() {
        return {
            showAddUserDialog: false,
            userForm: {
                username: '',
                gender: '',
            },
            users: [],
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            showEditUserDialog: false,
            editUserForm: {
                id: null,
                username: '',
                gender: '',
            },
            userRules: {
                username: [
                    { required: true, message: 'Please input the username', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: 'Please select the gender', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        resetForm() {
            this.userForm.username = '';
            this.userForm.gender = '';
        },
        addUser() {
            this.$refs.addUserForm.validate((valid) => {
            if (valid) {
                userApi.addUser(this.userForm).then(() => {
                    toast('add user succeed');
                    this.showAddUserDialog = false;
                    this.resetForm();
                    this.fetchUsers(); // 重新获取用户列表
                });
            } else {
                return false;
            }
            });
        },
        fetchUsers() {
            userApi.getUsers().then(response => {
                this.users = response.slice((this.pagination.currentPage - 1) * this.pagination.pageSize, this.pagination.currentPage * this.pagination.pageSize);
                this.pagination.total = response.length;
            });
        },
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            this.fetchUsers();
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            this.fetchUsers();
        },
        openEditDialog(user) {
            // console.log(user);
            this.editUserForm = { ...user };
            this.showEditUserDialog = true;
        },
        editUser() {
            this.$refs.editUserForm.validate((valid) => {
            if (valid) {
                userApi.editUser(this.editUserForm.id, this.editUserForm).then(() => {
                    toast('edit user succeed');
                    this.showEditUserDialog = false;
                    this.fetchUsers(); // 重新获取用户列表
                });
            } else {
                return false;
            }
            });
        },
        deleteUser(userId) {
            this.$confirm('Are you sure you want to delete this user?', 'Warning', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {
                userApi.deleteUser(userId).then(() => {
                    this.fetchUsers(); // 重新获取用户列表
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        },
        resetEditForm() {
            this.editUserForm = { id: null, username: '', gender: '' };
        },
        logout() {
        // 调用后端的登出接口
        logout().then(() => {
        // 清除 cookie 和 Vuex 状态
        removeCSRFToken();
        this.$store.replaceState({ admin: {} });
        // 重定向到登录页面
        this.$router.push('/login');
        }).catch(error => {
        console.error('Logout failed:', error);
        });
      }
    },

    mounted() {
        this.fetchUsers(); // 组件加载时获取用户列表
    }
};
</script>
  
<style>
.admin-info {
    margin-bottom: 20px;
}
</style>