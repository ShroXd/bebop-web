<template>
  <div class="reading-container">
    <div class="reading">
      <div class="chapter-name">{{chapter.chapter_name}}</div>
      <v-divider></v-divider>
      <div class="chapter-content"
           v-for="(content, index) in contents"
           :key="index">
        <div>{{content}}</div>
      </div>
    </div>
    <div class="func-container"
         ref="func">
      <v-btn class="func-btn"
             text
             color="primary"
             @click="preChapter()">上一章</v-btn>
      <v-btn class="func-btn"
             text
             color="primary"
             @click="jump2chapters()">目录</v-btn>
      <v-btn class="func-btn"
             text
             color="primary"
             @click="nextChapter()">下一章</v-btn>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import novel from '../../api/novel'

export default {
  name: 'Contents',
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
      chapter: {},
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
        })
        .finally(info => {
          this.modifyReadingMark()
        })
    },
    modifyReadingMark () {
      novel
        .modifyReadingMark({
          userId: this.userInfo.userId,
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
@import "../../assets/less/pageless/reading.less";

.overlay {
  width: 100px;
  height: 100vh;
}
</style>
