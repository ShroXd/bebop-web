<template>
  <div class="user-info-container">
    <!--用户信息-->
    <img class="user-head"
         src="../../../assets/img/user_placeholder.jpg">
    <div class="user-info">
      <div class="info-item">
        <span class="info-title">用户名</span>
        <span class="info-value">admin</span>
      </div>
      <div class="info-item">
        <span class="info-title">用户类型</span>
        <span class="info-value">管理员</span>
      </div>
      <div class="func-item">
        <v-btn text
               small>切换账号</v-btn>
        <v-btn text
               small
               @click="logout"
               color="error">注销</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push({
        path: '/entry'
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/novel.less";
</style>
