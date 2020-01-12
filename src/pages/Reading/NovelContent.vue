<template>
  <div class="reading-container">
    <!-- <div class="bread">
      <div class="bread-name">位置：</div>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
    </div> -->
    <div class="reading">
      <div class="chapter-name">{{chapterName}}</div>
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
             color="primary">目录</v-btn>
      <v-btn class="func-btn"
             text
             disabled
             color="primary">+ 书签</v-btn>
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
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    bookId: {
      type: String,
      default: ''
    },
    chapterId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('novel', ['getChapterIndex', 'getChapters'])
  },
  created () {
    this.currentChapterId = this.$route.query.chapterId
    this.fetchContents({
      bookId: this.$route.query.bookId,
      chapterId: this.$route.query.chapterId
    })
    this.fetchBook(this.$route.query.bookId)
    this.fetchChapter(this.$route.query.bookId)
  },
  mounted: function () {
    this.$docElement = document.documentElement
    this.$body = document.body
  },
  data () {
    return {
      items: [
        {
          text: '首页',
          disabled: false,
          href: '/'
        },
        {
          text: '11',
          disabled: true,
          href: '/#/chapter'
        },
        {
          text: '',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ],
      bookName: '',
      chapterName: '',
      id: '',
      currentChapterId: '',
      contents: [],
      chapterArr: []
    }
  },
  methods: {
    ...mapMutations('novel', ['setChapters', 'setChapterIndex']),
    toTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    fetchBook (id) {
      novel
        .book({
          bookId: id
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.bookName = res.data.data.bookName
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
            this.chapterArr = res.data.data.rows
          }
        })
    },
    fetchContents (query) {
      this.toTop()
      novel.content(query)
        .then((res) => {
          if (res.data.code === '000000') {
            this.chapterName = res.data.data.chapterName
            this.contents = res.data.data.contents
          }
        })
    },
    fetchCurrentChapterIndex () {
      let currentChapterIndex = this.chapterArr.findIndex(item => {
        return item.chapter_id === this.currentChapterId
      })
      return currentChapterIndex
    },
    preChapter () {
      if (this.fetchCurrentChapterIndex() > 0) {
        this.fetchContents({
          bookId: this.$route.query.bookId,
          chapterId: this.chapterArr[this.fetchCurrentChapterIndex() - 1].chapter_id
        })
        this.currentChapterId = this.chapterArr[this.fetchCurrentChapterIndex() - 1].chapter_id
      }
    },
    nextChapter () {
      if (this.fetchCurrentChapterIndex() < this.chapterArr.length) {
        this.fetchContents({
          bookId: this.$route.query.bookId,
          chapterId: this.chapterArr[this.fetchCurrentChapterIndex() + 1].chapter_id
        })
        this.currentChapterId = this.chapterArr[this.fetchCurrentChapterIndex() + 1].chapter_id
      }
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
