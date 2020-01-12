<template>
  <div>
    <div class="login">
      <v-form v-model="valid">
        <v-container class="container">
          <template v-if="step === '1'">
            <!-- TODO: 使用snackbars重写 -->
            <v-text-field label="用户名"
                          required
                          v-model="name"
                          :error-messages="nameMsg">
            </v-text-field>
            <v-text-field label="密码"
                          required
                          v-model="password"
                          :error-messages="passwdMsg"
                          :type="'password'">
            </v-text-field>
            <v-btn class="entry-btn"
                   depressed
                   color="primary"
                   @click="login">登录</v-btn>
            <v-btn class="entry-btn"
                   depressed
                   color="primary"
                   @click="change2register">注册</v-btn>
          </template>
          <template v-if="step === '2'">
            <v-alert v-if="registerCode !== '0'"
                     border="left"
                     colored-border
                     color="red lighten-2"
                     elevation="1">
              {{registerMsg}}
            </v-alert>
            <v-text-field label="用户名"
                          required
                          v-model="name">
            </v-text-field>
            <v-text-field label="密码"
                          required
                          v-model="password"
                          :type="'password'">
            </v-text-field>
            <v-text-field label="再输入一遍密码"
                          required
                          v-model="password"
                          :type="'password'">
            </v-text-field>
            <v-btn class="entry-btn"
                   depressed
                   color="primary"
                   @click="register">注册</v-btn>
            <v-btn class="entry-btn"
                   depressed
                   color="primary"
                   @click="change2login">切换</v-btn>
          </template>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import user from '../../api/login'
export default {
  name: 'Entry',
  data () {
    return {
      valid: false,
      registerCode: '0',
      nameMsg: '',
      passwdMsg: '',
      registerMsg: '',
      step: '1',
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.passwdMsg = ''
      this.nameMsg = ''
      user.login({
        params: {
          name: this.name,
          password: this.password
        }
      }).then((res) => {
        if (res.data.code === '000000') {
          if (res.data.data.code === '0') {
            this.$router.push('/novel')
          } else {
            if (res.data.data.code === '-2') {
              this.passwdMsg = res.data.data.msg
            } else if (res.data.data.code === '-3') {
              this.nameMsg = res.data.data.msg
            }
          }
        }
      })
    },
    change2login () {
      this.step = '1'
    },
    change2register () {
      this.step = '2'
    },
    register () {
      user.register({
        name: this.name,
        password: this.password
      }).then((res) => {
        if (res.data.code === '000000') {
          if (res.data.data.code === '-1') {
            // 参数缺失
            this.registerCode = res.data.data.code
            this.registerMsg = res.data.data.msg
            this.name = ''
            this.password = ''
          } else if (res.data.data.code === '-2') {
            // 用户名已存在
            this.registerCode = res.data.data.code
            this.registerMsg = res.data.data.msg
            this.name = ''
            this.password = ''
          } else if (res.data.data.code === '0') {
            // 注册成功
            this.registerCode = res.data.data.code
            this.registerMsg = res.data.data.msg
            this.step = '1'
          }
        }
      })
    }
  }

}

</script>

<style lang="less" scoped>
@import "../../assets/less/color.less";

.login {
  height: 100vh;
  width: 100vw;
  user-select: none;
  background: url("../../assets/img/entry_background.jpg") no-repeat;
  background-size: cover;
  background-position: center;

  .container {
    background-color: @_sys-white;
    border-radius: 10px;
    box-shadow: 1px 1px 3px @_sys-mid-gray;
    padding: 1.2rem;
    width: 400px;
    position: absolute;
    top: 15vh;
    left: 20vw;

    .entry-btn {
      float: right;
      margin-left: 0.6rem;
    }
  }
}
</style>
