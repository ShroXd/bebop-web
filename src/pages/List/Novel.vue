<template>
  <div class="portal">
    <v-carousel cycle
                hide-delimiters>
      <v-carousel-item v-for="(item,i) in items"
                       :key="i"
                       :src="item.src"></v-carousel-item>
    </v-carousel>
    <div class="main-container">
      <div>
        <novel-list></novel-list>
      </div>
      <div class="function-container">
        <user-info></user-info>
        <search></search>
        <star></star>
      </div>
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
      items: [
        {
          src: 'http://rs.sfacg.com/web/m/images/homePush/2019/12/0c46697a-b28d-479b-a0c7-1ace49fad0ca.jpg'
        },
        {
          src: 'http://rs.sfacg.com/web/m/images/homePush/2019/12/d5796313-0628-4a0a-8554-db2f8042c433.jpg'
        },
        {
          src: require('../../assets/img/color.jpg')
        }
      ],
      page: 1
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/novel.less";
</style>
