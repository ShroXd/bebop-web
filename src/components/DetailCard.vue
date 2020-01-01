<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        {{info.bookName}}
      </v-card-title>
      <div class="info-container">
        <v-card-text>
          分类：{{info.bookCategory}}
        </v-card-text>
        <v-card-text>
          字数：{{info.bookWordCount}}
        </v-card-text>
      </div>
      <v-card-text>
        {{detail.bookIntro}}
      </v-card-text>
      <v-divider></v-divider>
      <v-container>
        <div class="chapters-container">
          <div class="chapters" v-for="(chapter, index) in detail.rows" :key="index" @click="onDetail(chapter)">
            {{chapter.chapter_name}}
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import novel from '../api/novel'

export default {
  name: 'DetailCard',
  created () {
    this.fetchNovelDetail()
  },
  props: {
    bookInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      info: this.bookInfo,
      detail: {}
    }
  },
  methods: {
    fetchNovelDetail () {
      novel.chapter({
        bookId: this.bookInfo.bookId
      })
        .then((res) => {
          if (res.data.code === '000000') {
            this.detail = res.data.data
          }
        })
    },
    onClose () {
      this.$emit('close')
    },
    onDetail (item) {
      console.log(item)

      this.$router.push({
        path: '/content',
        query: {
          bookId: this.bookInfo.bookId,
          chapterId: item.chapter_id
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
  @import "../assets/less/color.less";

  .info-container {
    display: flex;
    color: @_sys-low-black
  }

  .chapters-container {
    display: flex;
    flex-wrap: wrap;

    .chapters {
      flex-basis: 33%;
      font-size: 0.8rem;
      color: @_sys-light-black;
      border-bottom: 1px solid @_sys-super-light-gray;
      padding: 0.5rem 0;
    }

    .chapters:hover {
      cursor: pointer;
      color: @_sys-orange;
    }

    .item {
      display: flex;
    }
  }

</style>
