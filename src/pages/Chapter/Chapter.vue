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
           @click="onDetail(chapter, index)">
        {{chapter.chapter_name}}
      </div>
    </div>
  </div>
</template>

<script>
import novel from '../../api/novel'
import { mapMutations } from 'vuex'

export default {
  name: 'Chapter',
  created () {
    this.fetchBook(this.$route.query.bookId)
    this.fetchChapter(this.$route.query.bookId)
  },
  data () {
    return {
      info: {},
      detail: {}
    }
  },
  methods: {
    ...mapMutations('novel', ['setChapters', 'setChapterIndex']),

    fetchBook (id) {
      novel
        .book({
          bookId: id
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.info = res.data.data
          }
        })
    },
    fetchChapter (id) {
      novel
        .chapter({
          bookId: id
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.detail = res.data.data
            this.setChapters(res.data.data.rows)
          }
        })
    },

    onDetail (item, index) {
      this.setChapterIndex(index)
      this.$router.push({
        path: '/content',
        query: {
          bookId: this.$route.query.bookId,
          chapterId: item.chapter_id
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/chapter.less";
</style>
