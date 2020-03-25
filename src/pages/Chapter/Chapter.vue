<template>
  <div class="page">
    <v-snackbar v-model="isSnackbarShow"
                :timeout='snackbarTimeout'
                :color="snackbarColor"
                :top="true">
      {{snackbarText}}
    </v-snackbar>
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
          <v-btn v-if="!isMarked"
                 class="func-btn"
                 small
                 color="primary"
                 :loading="loading"
                 :disabled="loading"
                 @click="addBookMark()">加入收藏</v-btn>
          <v-btn v-else
                 class="func-btn"
                 small
                 color="primary"
                 :loading="loading"
                 :disabled="loading"
                 @click="delBookMark()">取消收藏</v-btn>
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
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.info = JSON.parse(sessionStorage.getItem('bookInfo'))
    this.fetchChapter(this.info.bookName)
    this.fetchBookMark()
  },
  data () {
    return {
      loading: false,
      userId: '',
      isMarked: false,
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
      sessionStorage.setItem('chapter', JSON.stringify(item))
      this.$router.push({
        name: 'Content'
      })
    },

    addBookMark () {
      this.isSnackbarShow = false
      this.loading = true
      novel
        .addBookMark({
          userId: this.userId,
          bookName: this.detail.bookName
        })
        .then(res => {
          if (res.data.msg === '收藏成功') {
            this.isMarked = !this.isMarked
            this.isSnackbarShow = true
            this.snackbarColor = 'success'
            this.snackbarText = res.data.msg
          } else {
            this.isSnackbarShow = true
            this.snackbarColor = 'error'
            this.snackbarText = res.data.msg
          }
        })
        .finally(param => {
          this.loading = false
        })
    },

    delBookMark () {
      this.isSnackbarShow = false
      this.loading = true
      novel
        .delBookMark({
          userId: this.userId,
          bookName: this.detail.bookName
        })
        .then(res => {
          if (res.data.msg === '删除成功') {
            this.isMarked = !this.isMarked
            this.isSnackbarShow = true
            this.snackbarColor = 'success'
            this.snackbarText = res.data.msg
          } else {
            this.isSnackbarShow = true
            this.snackbarColor = 'error'
            this.snackbarText = res.data.msg
          }
        })
        .finally(param => {
          this.loading = false
        })
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
          console.log(this.info.bookName)
          if (result.length !== 0) {
            console.log('已经收藏过了')
            this.isMarked = true
          }
          console.log(this.isMarked)
        })
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/chapter.less";
</style>
