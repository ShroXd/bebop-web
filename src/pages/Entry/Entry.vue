<template>
  <div class="login">
    <v-card class="container">
      <v-form>
        <v-text-field label="用户名"
                      required
                      v-model="username"
                      :error-messages="usernameMessage">
        </v-text-field>
        <v-text-field label="密码"
                      required
                      v-model="password"
                      type="password"
                      :error-messages="passwordMessage">
        </v-text-field>
        <v-text-field label="再输入一遍密码"
                      required
                      v-model="reEnterPassword"
                      type="password"
                      :error-messages="reEnterPasswordMessage"
                      v-if="step === 'register'">
        </v-text-field>
      </v-form>
      <v-card-actions v-if="step === 'login'">
        <v-spacer></v-spacer>
        <v-btn class="entry-btn"
               depressed
               @click="change2register">切换至注册</v-btn>
        <v-btn class="entry-btn"
               depressed
               color="primary"
               @click="login">登录</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-btn class="entry-btn"
               depressed
               @click="change2login">切换</v-btn>
        <v-btn class="entry-btn"
               depressed
               color="primary"
               @click="register">注册</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import user from '../../api/login'
import { enDES3, httpCode } from '../../utils/utils'

export default {
  name: 'Entry',
  data () {
    return {
      step: 'login',
      username: '',
      password: '',
      reEnterPassword: '',
      usernameMessage: '',
      passwordMessage: '',
      reEnterPasswordMessage: ''
    }
  },
  methods: {
    login () {
      user.login({
        username: this.username,
        password: enDES3(this.password)
      }).then((res) => {
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('username', this.username)
        this.$router.push('/')
      }).catch((error) => {
        switch (error.response.status) {
          case httpCode['Forbidden']:
            // 密码错误
            this.passwordMessage = error.response.data.message
            break
          case httpCode['Not Acceptable']:
            // 用户未注册
            this.change2register()
            break
        }
      })
    },
    register () {
      this.reEnterPasswordMessage = ''
      if (this.password !== this.reEnterPassword) {
        this.reEnterPasswordMessage = '两次密码输入不一致'
        return
      }
      user.register({
        username: this.username,
        password: enDES3(this.password)
      }).then((res) => {
        this.step = 'login'
      }).catch((error) => {
        switch (error.response.status) {
          case httpCode['BadRequest']:
            this.showRegisterErrorMessage(error.response.data.message)
            break
          case httpCode['Conflict']:
            this.showRegisterErrorMessage(error.response.data.message)
        }
      })
    },
    showRegisterErrorMessage (message) {
      this.usernameMessage = message
      this.username = ''
      this.password = ''
      this.reEnterPassword = ''
    },
    change2login () {
      this.usernameMessage = ''
      this.step = 'login'
    },
    change2register () {
      this.step = 'register'
    }
  }
}
</script>

<style lang="less" scoped>
@import ".../../../../assets/less/pageless/entry.less";
</style>
