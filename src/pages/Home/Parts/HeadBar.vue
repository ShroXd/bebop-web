<template>
  <div class="head">
    <div class="head__title" @click="toIndex">是萝莉控真是太好🌶</div>
    <div class="head__search">
      <v-text-field v-model="bookName"
                    :loading="loading"
                    @change="onSearch(bookName)"
                    label="搜索小说"
                    clearable
                    dense
                    single-line
                    outlined>
        <v-icon slot="append" color="blue">search</v-icon>
      </v-text-field>
      <div class="head__func">
        <template v-if="user === ''">
          <div>登录</div>
          <div>注册</div>
        </template>
        <template v-else>
          <div class="func__books" @click="toUser">我的书架</div>
          <div class="func__logout" @click="onLogout">注销</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadBar',
  created () {
    this.fetchUserInfo()
  },
  data () {
    return {
      user: '',
      bookName: '',
      loading: false
    }
  },
  methods: {
    onSearch (name) {
      this.toPath('/', 'Novel')
      this.$EventBus.$emit('search', name)
    },
    fetchUserInfo () {
      this.user = JSON.stringify(localStorage.getItem('user'))
    },
    onLogout () {
      this.$router.push({name: 'Entry'})
      this.localStorage.removeItem('token')
    },
    toUser () {
      this.toPath('/user', 'User')
    },
    toIndex () {
      this.toPath('/', 'Novel')
    },
    toPath (path, routerName) {
      if (this.$route.path !== path) {
        this.$router.push({name: routerName})
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/head-bar.less";
</style>
