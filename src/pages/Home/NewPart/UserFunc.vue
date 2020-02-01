<template>
  <div class="user-func-container">
    <div class="user-name">{{userInfo.name}}</div>
    <v-btn text
           color="error"
           @click="logout">注销</v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserFunc',
  created () {
    this.userInfo.name = this.getUserInfo.name
  },
  computed: {
    ...mapGetters('user', ['getUserInfo'])
  },
  data () {
    return {
      userInfo: {
        name: ''
      }
    }
  },
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
@import "../../../assets/less/pageless/index.less";
</style>
