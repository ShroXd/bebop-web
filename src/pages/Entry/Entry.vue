<template>
  <div>
    <div class="login">
      <v-form>
        <v-container class="container">
          <v-text-field label="First name" required>
          </v-text-field>
          <v-text-field label="Last name" required>
          </v-text-field>
          <v-text-field label="E-mail" required></v-text-field>
          <v-btn depressed color="primary">登录</v-btn>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entry'

}

</script>

<style lang="less" scoped>
  @import '../../assets/less/color.less';

  .login {
    height: 100vh;
    width: 100vw;
    user-select: none;
    background: url('../../assets/img/entry_background.jpg') no-repeat;
    background-size: cover;
    background-position: center;

    .container {
      background-color: @_sys-white;
      border-radius: 10px;
      box-shadow: 1px 1px 3px @_sys-mid-gray;
      padding: 1.2rem;
      width: 20vw;
      position: absolute;
      top: 15vh;
      left: 20vw;

      .login-btn {
        float: right;
        margin-left: 0.6rem;
      }
    }
  }

</style>
