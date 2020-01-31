<template>
  <div class="portal">
    <div class="main-container">
      <div>
        <div class="line-container">
          <sentence></sentence>
          <gank-web></gank-web>
        </div>
        <div class="line-container">
          <novel-list></novel-list>
          <xian-du></xian-du>
        </div>
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
import Sentence from './EachPart/Sentence'
import GankWeb from './EachPart/GankWeb'
import XianDu from './EachPart/XianDu'

export default {
  name: 'Novel',
  components: {
    NovelList,
    UserInfo,
    Search,
    Star,
    Sentence,
    GankWeb,
    XianDu
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
