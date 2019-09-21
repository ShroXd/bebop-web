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
          <div v-for="(chapter, index) in detail.rows" :key="index">
            <v-card-text class="chapters">
              <v-icon>mdi-details</v-icon>
              {{chapter.chapter_name}}
            </v-card-text>
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import novel from '../../api/novel'

export default {
  name: 'NovelDetail',
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
    }
  }
}

</script>

<style lang="less" scoped>
  @import "../../assets/less/color.less";

  .info-container {
    display: flex;
    color: @_sys-low-black
  }

  .chapters {
    flex-basis: 30%
  }

  .chapters-container {
    display: flex;
    flex-wrap: wrap;

    &>div {
      flex-basis: 30%
    }
  }

</style>
