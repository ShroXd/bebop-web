<template>
  <div class="head">
    <div class="head__title">是萝莉控真是太好🌶</div>
    <div class="head__search">
      <v-text-field v-model="bookName"
                    :loading="loading"
                    @change="onSearch(bookName)"
                    label="搜索小说"
                    clearable
                    dense
                    single-line
                    outlined>
        <v-icon slot="append" color="blue">search</v-icon>
      </v-text-field>
      <div class="head__func">
        <div>登录</div>
        <div>注册</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HeadBar'
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/head-bar.less";
</style>
