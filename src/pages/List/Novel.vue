<template>
  <div class="portal">
    <template>
      <v-carousel>
        <v-carousel-item v-for="(item,i) in items"
                         :key="i"
                         :src="item.src"
                         reverse-transition="fade-transition"
                         transition="fade-transition"></v-carousel-item>
      </v-carousel>
    </template>
    <div class="main-container">
      <div class="novel-list-container">
        <div v-for="(item, index) in novels"
             :key="index">
          <v-hover v-slot:default="{ hover }">
            <v-card class="n-card"
                    max-width="200"
                    height="320"
                    :elevation="hover ? 4 : 1"
                    @click="onDetail(item)">
              <v-img class="n-img white--text"
                     height="200px"
                     :src="item.imageUrl"></v-img>
              <v-card-title class="n-title font-weight-medium">{{
              item.bookName
            }}</v-card-title>
            </v-card>
          </v-hover>
        </div>
      </div>
      <div class="function-container">
        <!--排行榜-->
        <div class="user-info-container">
          <!--用户信息-->
          <img class="user-head"
               src="../../assets/img/user_placeholder.jpg">
          <div class="user-info">
            <div class="info-item">
              <span class="info-title">用户名</span>
              <span class="info-value">admin</span>
            </div>
            <div class="info-item">
              <span class="info-title">用户类型</span>
              <span class="info-value">管理员</span>
            </div>
            <div class="func-item">
              <v-btn depressed
                     small
                     color="primary">切换账号</v-btn>
              <v-btn depressed
                     small
                     color="error">注销</v-btn>
            </div>
          </div>
        </div>
        <div class="ranking-container">
          <span class="ranking-title">更新排行榜</span>
          <div class="ranking-item">
            <span class="ranking">1</span>
            <span>昏暗宫殿的死者之王</span>
          </div>
          <div class="ranking-item">
            <span class="ranking">2</span>
            <span>冰菓</span>
          </div>
          <div class="ranking-item">
            <span class="ranking">13</span>
            <span>昏暗宫殿的死者之王</span>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog"
              width="1300">
      <detail-card :bookInfo.sync="bookInfo"
                   v-if="dialog"
                   @close="onClose"></detail-card>
    </v-dialog>
    <v-footer>
      <div class="flex-grow-1"></div>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
import novel from '../../api/novel'
import DetailCard from '../../components/DetailCard'

export default {
  name: 'Novel',
  components: {
    DetailCard
  },
  created () {
    this.fetchNovelList()
  },
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      novels: [],
      offsetTop: 0,
      dialog: false,
      isDetailShow: false,
      detail: {},
      info: {},
      bookInfo: {}
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },

    fetchNovelList () {
      novel
        .list({
          page: 1,
          limit: 5
        })
        .then(res => {
          this.novels = res.data.rows
        })
    },

    onDetail (item) {
      this.bookInfo = item
      this.dialog = !this.dialog
    },

    onClose () {
      this.dialog = !this.dialog
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/novel.less";
</style>
