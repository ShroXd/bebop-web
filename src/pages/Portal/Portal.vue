<template>
  <div class="portal">
    <v-toolbar>
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
  name: 'Entry',
  methods: {}

}

</script>

<style lang="less" scoped>
  @import "../../assets/less/color.less";

  .portal {
    background-color: @_sys-super-light-gray;
  }

</style>
