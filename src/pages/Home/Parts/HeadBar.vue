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
  .head {
    width: 100vw;
    height: 4rem;
    box-shadow: 0 3px 4px gray;
    position: fixed;
    z-index: 999;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }

  .head__title {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
  }

  .head__search {
    width: 35rem;
    margin-top: 0.8rem;
    display: flex;
  }

  .head__func {
    width: 10rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.1rem;
    margin-left: 2rem;
  }
</style>
