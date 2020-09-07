<template>
  <div class="reading-container">
    <div class="reading">
      <div>
        <v-skeleton-loader v-if="!chapterName"
                           type="heading"></v-skeleton-loader>{{chapterName}}
      </div>

      <v-divider class="divider"></v-divider>
      <v-skeleton-loader v-if="contents.length === 0"
                           type="paragraph@2"></v-skeleton-loader>
      <div v-for="(content, index) in contents"
           :key="index">
        <div>{{content}}</div>
      </div>
    </div>
    <div class="func-container"
         ref="func">
      <v-btn text
             color="primary"
             @click="preChapter()">上一章</v-btn>
      <v-btn text
             color="primary"
             @click="jump2chapters()">目录</v-btn>
      <v-btn text
             color="primary"
             @click="nextChapter()">下一章</v-btn>
    </div>
  </div>
</template>

<script>
import novel from '../../../api/novel'
import {httpCode} from '../../../utils/utils'

export default {
  name: 'Reading',
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('user'))
    this.bookInfo = JSON.parse(sessionStorage.getItem('bookInfo'))
    this.chapters = JSON.parse(sessionStorage.getItem('chapters'))
    this.chapter = JSON.parse(sessionStorage.getItem('chapter'))
    this.fetchContents({
      bookName: this.bookInfo.bookName,
      chapterId: this.chapter.chapter_id
    })
  },
  data () {
    return {
      userInfo: {},
      bookInfo: {},
      chapters: {},
      chapterName: '',
      contents: [],
      chapterIndex: ''
    }
  },
  methods: {
    toTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    fetchContents (query) {
      this.toTop()
      novel.contents(query)
        .then((res) => {
          this.contents = res.data.data.chapterContent
          this.chapterName = res.data.data.chapterName
        })
        .catch(error => {
          switch (error.response.status) {
            case httpCode['Not Found']:
              // 内容不存在
          }
        })
        .finally(() => {
          this.modifyReadingMark()
        })
    },
    modifyReadingMark () {
      novel
        .modifyReadingMark({
          bookName: this.bookInfo.bookName,
          chapterId: this.chapter.chapter_id
        })
        .then(res => {
          console.log(res)
        })
    },
    fetchCurrentChapterIndex () {
      let currentChapterIndex = this.chapters.findIndex(item => {
        return item.chapter_id === this.chapter.chapter_id
      })
      console.log('currentChapterIndex', currentChapterIndex)
      return currentChapterIndex
    },
    preChapter () {
      this.chapterName = ''
      this.contents = []
      if (this.fetchCurrentChapterIndex() > 0) {
        this.fetchContents({
          bookName: this.bookInfo.bookName,
          chapterId: this.chapters[this.fetchCurrentChapterIndex() - 1].chapter_id
        })
        this.chapter = this.chapters[this.fetchCurrentChapterIndex() - 1]
        sessionStorage.setItem('chapter', JSON.stringify(this.chapter))
      }
    },
    nextChapter () {
      this.chapterName = ''
      this.contents = []
      if (this.fetchCurrentChapterIndex() < this.chapters.length) {
        this.fetchContents({
          bookName: this.bookInfo.bookName,
          chapterId: this.chapters[this.fetchCurrentChapterIndex() + 1].chapter_id
        })
        this.chapter = this.chapters[this.fetchCurrentChapterIndex() + 1]
        sessionStorage.setItem('chapter', JSON.stringify(this.chapter))
      }
    },
    jump2chapters () {
      this.$router.push({
        name: 'Chapter'
      })
    }
  }

}

</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/reading.less";
</style>
