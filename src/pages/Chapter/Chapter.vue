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
          <v-btn class="func-btn"
                 small
                 color="primary">全文阅读</v-btn>
          <v-btn class="func-btn"
                 small
                 color="primary">放入书架</v-btn>
        </div>
      </div>
    </div>
    <div class="chapters-container">
      <div class="chapters"
           v-for="(chapter, index) in detail.rows"
           :key="index"
           @click="onDetail(chapter)">
        {{chapter.chapter_name}}
      </div>
    </div>
  </div>
</template>

<script>
import novel from '../../api/novel'

export default {
  name: 'Chapter',
  created () {
    let passedQuery = JSON.parse(this.$route.query.book)
    this.info = passedQuery
    this.fetchBook(passedQuery.bookId)
  },
  data () {
    return {
      info: {},
      detail: {}
    }
  },
  methods: {
    fetchBook (id) {
      novel
        .chapter({
          bookId: id
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.detail = res.data.data
          }
        })
    },

    onDetail (item) {
      console.log(this.info)

      this.$router.push({
        path: '/content',
        query: {
          bookId: this.info.bookId,
          bookName: this.info.bookName,
          chapterId: item.chapter_id,
          chapterName: item.chapter_name,
          chapterArr: JSON.stringify(this.detail)
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/chapter.less";
</style>
