<template>
  <div class="login">
    <v-card class="container">
      <v-alert v-if="alert"
               border="left"
               colored-border
               color="red lighten-2"
               elevation="1">
        {{registerMsg}}
      </v-alert>
      <v-form>
        <v-text-field label="用户名"
                      required
                      v-model="username"
                      :error-messages="nameMsg">
        </v-text-field>
        <v-text-field label="密码"
                      required
                      v-model="password"
                      type="password"
                      :error-messages="passwdMsg">
        </v-text-field>
        <v-text-field label="再输入一遍密码"
                      required
                      v-model="reEnterPassword"
                      type="password"
                      :error-messages="reEnterPasswordMsg"
                      v-if="step === 'register'">
        </v-text-field>
      </v-form>
      <v-card-actions v-if="step === 'login'">
        <v-spacer></v-spacer>
        <v-btn class="entry-btn"
               depressed
               @click="change2register">注册</v-btn>
        <v-btn class="entry-btn"
               depressed
               color="primary"
               @click="login">登录</v-btn>
      </v-card-actions>
      <v-card-actions v-else-if="step === 'register'">
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

export default {
  name: 'Entry',
  data () {
    return {
      step: 'login',
      alert: false,
      registerMsg: '',
      nameMsg: '',
      passwdMsg: '',
      username: '',
      password: '',
      reEnterPassword: '',
      reEnterPasswordMsg: ''
    }
  },
  methods: {
    login () {
      user.login({
        username: this.username,
        password: this.password
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.msg === '登录成功') {
            this.$router.push('/')
          } else {
            if (res.data.msg === '密码错误') {
              this.passwdMsg = res.data.msg
            } else if (res.data.msg === '用户名错误') {
              this.nameMsg = res.data.msg
            }
          }
        }
      })
    },
    register () {
      this.reEnterPasswordMsg = ''
      if (this.password !== this.reEnterPassword) {
        this.reEnterPasswordMsg = '两次密码输入不一致'
        return
      }
      user.register({
        username: this.username,
        password: this.password
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.msg === '注册成功') {
            this.registerMsg = res.data.msg
            this.step = 'login'
          } else {
            this.alert = true
            this.registerMsg = res.data.msg
            this.username = ''
            this.password = ''
            this.reEnterPassword = ''
          }
        }
      })
    },
    change2login () {
      this.alert = false
      this.registerMsg = ''
      this.step = 'login'
    },
    change2register () {
      this.step = 'register'
    }
  }

}

</script>

<style lang="less" scoped>
@import "../../assets/less/color.less";
.container_position(@top, @left) {
  background-color: @_sys-white;
  border-radius: 10px;
  box-shadow: 1px 1px 3px @_sys-mid-gray;
  padding: 0.8rem;
  top: @top;
  left: @left;
}

.login {
  height: 100%;
  width: 100%;
  user-select: none;
  @media screen and (min-width: 450px) {
    background: url("https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2020-03-21-z3bVKu.jpg")
      no-repeat;
    background-position: center
  }

  @media screen and (max-width: 450px) {
    background: url("https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2020-03-21-wi8xB9.jpg")
      no-repeat;
  }

  .entry-btn {
    float: right;
    margin-left: 0.6rem;
  }

  @media screen and (min-width: 450px) {
    .container {
      width: 25rem;
      min-width: 10rem;
      position: absolute;
      .container_position(10rem, 14rem);
    }
  }

  @media screen and (max-width: 450px) {
    .container {
      width: 18rem;
      min-width: 10rem;
      margin: 6rem auto;
      .container_position(0, 0);
    }
  }
}
</style>
