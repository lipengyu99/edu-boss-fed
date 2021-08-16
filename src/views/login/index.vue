<template>
  <div class="bg">
    <el-form
      label-position="top"
      class="login-form"
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="btn"
          type="primary"
          size="default"
          @click="onSubmit"
          :loading="isLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { login } from '@/api/users'
@Component
export default class Login extends Vue {
  private form = {
    phone: '15510792995',
    password: '111111'
  }

  private rules = {
    phone: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur'
      },
      { pattern: /^1\d{10}$/, message: '长度在11个字符', trigger: 'blur' }
    ],
    password: [
      {
        min: 6,
        max: 18,
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  }

  private isLoading = false
  private async onSubmit () {
    try {
      await (this.$refs.form as Form).validate()
      this.isLoading = true
      const { data } = await login(this.form)
      if (data.state !== 1) {
        this.$message.error(data.message)
      } else {
        this.$store.commit('setUser', data.content)
        this.$router.push((this.$route.query.redirect as string) || '/')
        this.$message.success('登录成功')
      }
    } catch (error) {
      console.log(error)
    }
    this.isLoading = false
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.bg {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e9eef3;
  width: 100%;
  height: 100vh;
}
.login-form {
  background: #fff;
  width: 300px;
  padding: 20px;
}
.btn {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
</style>
