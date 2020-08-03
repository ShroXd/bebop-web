<template>
  <div class="main">
    <!-- <Header></Header> -->
    <head-bar></head-bar>
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <v-footer absolute>
      <div class="flex-grow-1"></div>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer> -->
  </div>
</template>

<script>
import Header from './Header'
import HeadBar from '../Home/Parts/HeadBar'
import Overlay from '../Overlay/Overlay'

export default {
  name: 'Main',
  components: {
    Header,
    HeadBar,
    Overlay
  }
}

</script>

<style lang="less" scoped>
  @import "../../assets/less/pageless/main.less";
</style>
