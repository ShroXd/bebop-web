<template>
  <div>
    <div v-for="(content, index) in contents" :key="index">
      <div>{{content}}</div>
    </div>
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
    this.fetchContents()
  },
  data () {
    return {
      contents: []
    }
  },
  methods: {
    fetchContents () {
      novel.content({
        bookId: this.$route.query.bookId,
        chapterId: this.$route.query.chapterId
      })
        .then((res) => {
          if (res.data.code === '000000') {
            this.contents = res.data.data.contents
          }
        })
    }
  }

}

</script>

<style lang="less" scoped>
  .overlay {
    width: 100px;
    height: 100vh;
  }

</style>
