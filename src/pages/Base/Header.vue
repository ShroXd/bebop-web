<template>
  <div class="header">
    <v-toolbar class="navbar">
      <v-toolbar-title>Bebop</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text>首页</v-btn>
        <v-btn text>归档</v-btn>
        <v-btn text>数据</v-btn>
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>mdi-export-variant</v-icon>
      </v-btn>
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
  }

</style>
