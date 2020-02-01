<template>
  <div class="main">
    <!-- <Header></Header> -->
    <router-view></router-view>
    <v-footer fixed>
      <div class="flex-grow-1"></div>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
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
  //height: e("calc(100vh)");
  background-image: url(https://img.totoro.ink/images/2018/02/04/o8VX.png);
  height: 100vh;
  width: 100vw;
}
</style>
