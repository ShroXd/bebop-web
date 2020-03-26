<template>
  <div class="user-func-container">
    <div class="user-name">{{userInfo.username}}</div>
    <v-btn text
           color="error"
           @click="logout">注销</v-btn>
  </div>
</template>

<script>
import user from '../../../api/user'

export default {
  name: 'UserFunc',
  created () {
    this.fetchInfo()
  },
  computed: {
  },
  data () {
    return {
      userInfo: {
        username: ''
      }
    }
  },
  methods: {
    fetchInfo () {
      user
        .fetchUserInfo()
        .then(res => {
          this.userInfo.username = res.data.data.username
        })
    },
    logout () {
      this.$router.push({
        path: '/entry'
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/index.less";
</style>
