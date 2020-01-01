<template>
  <div class="main">
    <Header></Header>
    <router-view></router-view>
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
  height: e("calc(100vh)");
}
</style>
