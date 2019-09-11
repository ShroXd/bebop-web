<template>
  <div>
    <div class="login">
      <v-form>
        <v-container class="container">
          <v-text-field label="用户名" required>
          </v-text-field>
          <v-text-field label="密码" required>
          </v-text-field>
          <v-text-field label="E-mail" required></v-text-field>
          <v-btn class="entry-btn" depressed color="primary" @click="jump2portal">登录</v-btn>
          <v-btn class="entry-btn" depressed color="primary">注册</v-btn>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  methods: {
    jump2portal () {
      this.$router.push('/portal')
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
      width: 300px;
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
