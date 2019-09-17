<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        {{info.bookName}}
      </v-card-title>
      <v-card-text>
        分类：{{info.bookCategory}}
      </v-card-text>
      <v-card-text>
        字数：{{info.bookWordCount}}
      </v-card-text>
      <v-card-text>
        {{detail.bookIntro}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="onClose">
          好的
        </v-btn>
      </v-card-actions>
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

</style>
