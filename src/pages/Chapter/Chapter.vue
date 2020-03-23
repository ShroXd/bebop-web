<template>
  <div class="page">
    <div class="book-detail">
      <div class="book-cover">
        <v-img :src="info.imageUrl"
               width="170"
               height="240"></v-img>
      </div>
      <div class="book-info">
        <div class="name">{{info.bookName}}</div>
        <div class="detail-container">
          <div class="detail">文库：{{info.bookCategory}}</div>
          <div class="detail">字数：{{info.bookWordCount}} 字</div>
        </div>
        <v-divider></v-divider>
        <div class="synopsis">{{detail.bookIntro}}</div>
        <div class="func-container">
          <!-- <v-btn class="func-btn"
                 small
                 color="primary">全文阅读</v-btn> -->
          <!-- <v-btn class="func-btn"
                 small
                 color="primary"
                 @click="addStar()">加入收藏</v-btn> -->
        </div>
      </div>
    </div>
    <div class="chapters-container">
      <div class="chapters"
           v-for="(chapter, index) in detail.chapterInfo"
           :key="index"
           @click="onDetail(chapter, index)">
        {{chapter.chapter_name}}
      </div>
    </div>
  </div>
</template>

<script>
import novel from '../../api/novel'
import { mapGetters } from 'vuex'

export default {
  name: 'Chapter',
  computed: {
    ...mapGetters('novel', ['getBookInfo'])
  },
  mounted () {
    this.info = JSON.parse(sessionStorage.getItem('bookInfo'))
    this.fetchChapter(this.info.bookName)
  },
  data () {
    return {
      info: {},
      detail: {}
    }
  },
  methods: {
    fetchChapter (bookName) {
      novel
        .chapters({
          bookName: bookName
        })
        .then((res) => {
          this.detail = res.data.data
        })
    },

    onDetail (item, index) {
      sessionStorage.setItem('chapters', JSON.stringify(this.detail.chapterInfo))
      sessionStorage.setItem('chapter', JSON.stringify(item))
      this.$router.push({
        name: 'Content'
      })
    },

    addStar () {
      let param = {
        userName: this.getUserInfo.name,
        bookId: this.$route.query.bookId
      }

      console.log(JSON.stringify(param))

      novel
        .addStar(param)
        .then(res => {
          if (res.data.code === '000000') {
            // some code
          }
        })
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/chapter.less";
</style>
