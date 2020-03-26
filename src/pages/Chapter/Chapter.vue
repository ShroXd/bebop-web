<template>
  <div class="page">
    <v-snackbar v-model="isSnackbarShow"
                :timeout='snackbarTimeout'
                :color="snackbarColor"
                :top="true">
      {{snackbarText}}
    </v-snackbar>
    <div class="book-info">
      <div>
        <v-img :src="info.imageUrl"
               width="170"
               height="240"></v-img>
      </div>
      <div>
        <div class="book-name">{{info.bookName}}</div>
        <div class="book-detail">
          <div>文库：{{info.bookCategory}}</div>
          <div>字数：{{info.bookWordCount}} 字</div>
        </div>
        <v-divider></v-divider>
        <div v-if="detail.bookIntro"
             class="synopsis">{{detail.bookIntro}}</div>
        <v-skeleton-loader v-else
                           class="synopsis"
                           type="paragraph"></v-skeleton-loader>
        <div>
          <!-- <v-btn class="func-btn"
                 small
                 color="primary">继续阅读</v-btn> -->
          <v-btn class="reading-btn"
                 small
                 color="primary"
                 @click="onReading()">
            {{ hasReadingRecord ? `继续阅读` : `开始阅读`}}
          </v-btn>
          <v-btn small
                 :loading="loading"
                 :disabled="loading"
                 @click="changeBookMark()">{{ isMarked ? `取消收藏` : `加入收藏`}}</v-btn>
        </div>
      </div>
    </div>
    <div class="chapters">
      <template v-if="!detail.chapterInfo">
        <div v-for="(item, index) in new Array(16)"
             :key=index>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
        </div>
      </template>
      <div v-else
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

export default {
  name: 'Chapter',
  created () {
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.info = JSON.parse(sessionStorage.getItem('bookInfo'))
    this.fetchChapter(this.info.bookName)
    this.fetchBookMark()
    this.fetchReadingMark()
  },
  data () {
    return {
      loading: false,
      userId: '',
      isMarked: false,
      hasReadingRecord: false,
      readingRecord: '',
      isSnackbarShow: false,
      snackbarColor: 'success',
      snackbarTimeout: 2000,
      snackbarText: '',
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
      sessionStorage.setItem('chapter', JSON.stringify({
        chapter_id: item.chapter_id
      }))
      this.$router.push({
        name: 'Content'
      })
    },

    onReading () {
      sessionStorage.setItem('chapters', JSON.stringify(this.detail.chapterInfo))
      sessionStorage.setItem('chapter', JSON.stringify({
        chapter_id: this.readingRecord.chapterMarks || this.detail.chapterInfo[0].chapter_id
      }))

      this.$router.push({
        name: 'Content'
      })
    },

    markSuccess (msg) {
      this.isMarked = !this.isMarked
      this.isSnackbarShow = true
      this.snackbarColor = 'success'
      this.snackbarText = msg
    },

    markFail (msg) {
      this.isSnackbarShow = true
      this.snackbarColor = 'error'
      this.snackbarText = msg
    },

    changeBookMark () {
      this.isSnackbarShow = false
      this.loading = true

      if (this.isMarked) {
        novel
          .delBookMark({
            userId: this.userId,
            bookName: this.detail.bookName
          })
          .then(res => {
            if (res.data.msg === '删除成功') {
              this.markSuccess(res.data.msg)
            } else {
              this.markFail(res.data.msg)
            }
          })
          .finally(param => {
            this.loading = false
          })
      } else {
        novel
          .addBookMark({
            userId: this.userId,
            bookName: this.detail.bookName
          })
          .then(res => {
            if (res.data.msg === '收藏成功') {
              this.markSuccess(res.data.msg)
            } else {
              this.markFail(res.data.msg)
            }
          })
          .finally(param => {
            this.loading = false
          })
      }
    },

    fetchBookMark () {
      novel
        .fetchBookMark({
          userId: this.userId
        })
        .then(res => {
          let result = res.data.data.filter(n => {
            return n === this.info.bookName
          })
          if (result.length !== 0) {
            this.isMarked = true
          }
        })
    },

    fetchReadingMark () {
      novel
        .fetchReadingMark({
          userId: this.userId
        })
        .then(res => {
          let result = res.data.data.filter(n => {
            return n.bookName === this.info.bookName
          })
          if (result.length !== 0) {
            this.hasReadingRecord = true
            this.readingRecord = result[0]
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/chapter.less";
</style>
