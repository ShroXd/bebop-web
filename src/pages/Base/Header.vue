<template>
  <div class="header">
    <v-toolbar class="navbar">
      <v-toolbar-title>Bebop</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text class="text">首页</v-btn>
        <v-btn text class="text">轻小说</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {

}

</script>

<style lang="less" scoped>
  @import "../../assets/less/color.less";

  .navbar {
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: @_sys-white;
    color: @_sys-black;
    font-weight: 400;

    .text {
      color: @_sys-black
    }
  }

</style>
