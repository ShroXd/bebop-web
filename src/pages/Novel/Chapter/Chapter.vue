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
            <v-btn v-if="!isMarked" icon color="gray" :loading="loading" @click="changeBookMark()">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn v-else icon color="pink" :loading="loading" @click="changeBookMark()">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn class="reading-btn"
                   text
                   color="primary"
                   @click="onReading()">
              {{ hasReadingRecord ? `继续阅读` : `开始阅读`}}
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
import { httpCode } from '../../../utils/utils'

export default {
  name: 'Chapter',
  created () {
    this.loading = true
    this.info = JSON.parse(sessionStorage.getItem('bookInfo'))
    this.fetchChapter(this.info.bookName)
    this.fetchBookMark()
    this.fetchReadingMark()
    this.loading = false
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
      console.log('readingRecord: ' + this.readingRecord)
      sessionStorage.setItem('chapters', JSON.stringify(this.detail.chapterInfo))
      sessionStorage.setItem('chapter', JSON.stringify({
        chapter_id: this.readingRecord || this.detail.chapterInfo[0].chapter_id
      }))

      this.$router.push({
        name: 'Content'
      })
    },

    changeBookMark () {
      this.loading = true

      if (!this.isMarked) {
        novel.addBookMark({
          bookName: this.detail.bookName
        }).then(res => {
          // 添加收藏成功
          this.isMarked = true
        }).finally(() => {
          this.loading = false
        })
        return
      }

      novel
        .delBookMark({
          bookName: this.detail.bookName
        })
        .then(res => {
          // 取消收藏成功
          this.isMarked = false
        }).finally(() => {
          this.loading = false
        })
    },

    fetchBookMark () {
      novel
        .fetchBookMark({
          params: {
            bookName: this.info.bookName
          }
        })
        .then(res => {
          if (res.data.data[0].bookName === this.info.bookName) {
            this.isMarked = true
          }
        })
        .catch(error => {
          switch (error.response.status) {
            case httpCode['BadRequest']:
              // 参数不全
              break
            case httpCode['Not Found']:
              // 未收藏
              break
          }
        })
    },

    fetchReadingMark () {
      novel
        .fetchReadingMark({
          bookName: this.info.bookName
        })
        .then(res => {
          if (res.data.data) {
            if (res.data.data[0].bookName === this.info.bookName) {
              this.hasReadingRecord = true
              this.readingRecord = res.data.data[0].chapterId
            }
          }
        })
        .catch(error => {
          switch (error.response.status) {
            case httpCode['Not Found']:
              // 未找到阅读记录数据
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../../assets/less/pageless/chapter.less";
</style>
