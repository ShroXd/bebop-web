<template>
  <div class="page">
    <v-card
      class="card"
      outlined>
      <div class="book-info">
        <div class="book-img">
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
               class="synopsis">{{detail.bookIntro}}
          </div>
          <v-skeleton-loader v-else
                             class="synopsis"
                             type="paragraph"></v-skeleton-loader>
          <v-divider></v-divider>
          <div class="btn-group">
            <v-btn class="reading-btn"
                   text
                   color="primary"
                   @click="onReading()">
              {{ hasReadingRecord ? `继续阅读` : `开始阅读`}}
            </v-btn>
            <v-btn v-if="!isMarked" icon color="gray" :loading="loading" @click="changeBookMark()">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn v-else icon color="pink" :loading="loading" @click="changeBookMark()">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>

    <v-card outlined>
      <div class="chapters">
        <template v-if="!detail.chapterInfo">
          <div v-for="(item, index) in new Array(16)"
               :key=index>
            <v-skeleton-loader type="list-item"></v-skeleton-loader>
          </div>
        </template>
        <div class="chapter"
          v-else
             v-for="(chapter, index) in detail.chapterInfo"
             :key="index"
             @click="onDetail(chapter, index)">
          {{chapter.chapter_name}}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import novel from '../../../api/novel'

export default {
  name: 'Chapter',
  created () {
    this.info = JSON.parse(sessionStorage.getItem('bookInfo'))
    this.fetchChapter(this.info.bookName)
    this.fetchBookMark()
    this.fetchReadingMark()
  },
  data () {
    return {
      loading: false,
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
            bookName: this.detail.bookName
          })
          .then(res => {
            if (res.data.msg === '删除成功') {
              this.isMarked = false
            } else {
              this.isMarked = true
            }
          })
          .finally(param => {
            this.loading = false
          })
      } else {
        novel
          .addBookMark({
            bookName: this.detail.bookName
          })
          .then(res => {
            if (res.data.msg === '收藏成功') {
              this.isMarked = true
            } else {
              this.isMarked = false
            }
          })
          .finally(param => {
            this.loading = false
          })
      }
    },

    fetchBookMark () {
      novel
        .fetchBookMark()
        .then(res => {
          let result = res.data.data.bookCollections.filter(n => {
            return n === this.info.bookName
          })
          if (result.length !== 0) {
            this.isMarked = true
          }
        })
    },

    fetchReadingMark () {
      novel
        .fetchReadingMark()
        .then(res => {
          if (res.data.data) {
            let result = res.data.data.bookRecentReading.filter(n => {
              return n.bookName === this.info.bookName
            })
            if (result.length !== 0) {
              this.hasReadingRecord = true
              this.readingRecord = result[0]
            }
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../../assets/less/pageless/chapter.less";
</style>
