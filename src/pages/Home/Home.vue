<template>
  <div class="portal">
    <div class="main-container">
      <div>
        <novel-list></novel-list>
      </div>
      <!-- <div class="function-container">
        <user-info></user-info>
        <search></search>
        <star></star>
      </div> -->
    </div>
  </div>
</template>

<script>
import NovelList from './EachPart/NovelList'
import UserInfo from './EachPart/UserInfo'
import Search from './EachPart/Search.vue'
import Star from './EachPart/Star'

export default {
  name: 'Novel',
  components: {
    NovelList,
    UserInfo,
    Search,
    Star
  },
  data () {
    return {
      page: 1
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/home.less";
</style>
