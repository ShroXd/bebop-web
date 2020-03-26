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
.main {
  overflow: scroll;
  background-image: url(https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2020-03-12-vEZGY5.png);
  background-size: 100% 100%;
  height: 100vh;
  width: 100vw;
}
</style>
