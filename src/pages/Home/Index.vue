<template>
  <div class="portal">
    <user-func></user-func>
    <web-title></web-title>
    <v-divider></v-divider>
    <div class="portal-main">
      <div>
        <!-- <recommend></recommend> -->
        <func-part></func-part>
      </div>
      <light-novel></light-novel>
    </div>
  </div>
</template>

<script>
import UserFunc from './Parts/UserFunc'
import WebTitle from './Parts/WebTitle'
import Recommend from './Parts/Recommend'
import FuncPart from './Parts/FuncPart'
import LightNovel from './Parts/LightNovel'
import XianDu from './Parts/XianDu'

export default {
  name: 'Novel',
  components: {
    UserFunc,
    WebTitle,
    Recommend,
    FuncPart,
    LightNovel,
    XianDu
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/index.less";
</style>
