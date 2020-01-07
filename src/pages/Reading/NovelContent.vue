<template>
  <div class="reading-container">
    <div class="bread">
      <div class="bread-name">位置：</div>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="reading">
      <div class="chapter-name">{{chapter}}</div>
      <v-divider></v-divider>
      <div class="chapter-content"
           v-for="(content, index) in contents"
           :key="index">
        <div>{{content}}</div>
      </div>
    </div>
    <div class="func-container">
      <v-btn class="func-btn"
             text
             color="primary"
             @click="prePage()">上一页</v-btn>
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
             @click="nextPage()">下一页</v-btn>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import novel from '../../api/novel'

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
  created () {
    this.fetchContents({
      bookId: this.$route.query.bookId,
      chapterId: this.$route.query.chapterId
    })
    this.chapter = this.$route.query.chapterName
    this.id = this.$route.query.chapterId
    this.chapterArr = JSON.parse(this.$route.query.chapterArr).rows
    console.log(JSON.parse(this.$route.query.chapterArr).rows)
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
          text: this.$route.query.bookName,
          disabled: true,
          href: '/#/chapter'
        },
        {
          text: this.$route.query.chapterName,
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ],
      chapter: '',
      id: '',
      contents: [],
      chapterArr: []
    }
  },
  methods: {
    fetchContents (query) {
      novel.content(query)
        .then((res) => {
          if (res.data.code === '000000') {
            this.contents = res.data.data.contents
          }
        })
    },
    prePage () {
      let num = this.chapterArr.findIndex((i) => { return JSON.stringify(i) === JSON.stringify({ chapter_name: this.chapter, chapter_id: this.id }) })
      if (num > 0) {
        this.fetchContents({
          bookId: this.$route.query.bookId,
          chapterId: this.chapterArr[num - 1].chapter_id
        })
        this.chapter = this.chapterArr[num - 1].chapter_name
        this.id = this.chapterArr[num - 1].chapter_id
      }
    },
    nextPage () {
      let num = this.chapterArr.findIndex((i) => { return JSON.stringify(i) === JSON.stringify({ chapter_name: this.chapter, chapter_id: this.id }) })
      if (num < this.chapterArr.length) {
        this.fetchContents({
          bookId: this.$route.query.bookId,
          chapterId: this.chapterArr[num + 1].chapter_id
        })
        this.chapter = this.chapterArr[num + 1].chapter_name
        this.id = this.chapterArr[num + 1].chapter_id
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
