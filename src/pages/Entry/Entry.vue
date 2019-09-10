<template>
  <div>
    <div class="login">
      <div class="container">
        <el-form>
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" v-model="input" size="small" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="请输入密码" size="small" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button class="login-btn" type="primary" size="small">登录</el-button>
        <el-button class="login-btn" size="small">注册</el-button>
      </div>
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
