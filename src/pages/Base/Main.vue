<template>
  <div class="main">
    <!-- <Header></Header> -->
    <router-view></router-view>
    <!-- <v-footer absolute>
      <div class="flex-grow-1"></div>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer> -->
  </div>
</template>

<script>
import Header from './Header'
import Overlay from '../Overlay/Overlay'

export default {
  name: 'Main',
  components: {
    Header,
    Overlay
  }
}

</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/main.less";
</style>
