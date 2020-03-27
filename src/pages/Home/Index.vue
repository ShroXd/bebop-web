<template>
  <div class="portal">
    <user-func></user-func>
    <web-title></web-title>
    <v-divider></v-divider>
    <light-novel></light-novel>
  </div>
</template>

<script>
import UserFunc from './Parts/UserFunc'
import WebTitle from './Parts/WebTitle'
import LightNovel from './Parts/LightNovel'
import XianDu from './Parts/XianDu'

export default {
  name: 'Novel',
  components: {
    UserFunc,
    WebTitle,
    LightNovel,
    XianDu
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/index.less";
</style>
