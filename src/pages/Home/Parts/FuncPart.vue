<template>
  <div class="func">
    <div class="func-mark">
      <div v-for="(item, index) of markArr"
           :key="index">
        <span class="list-index">{{index + 1}}</span>
        <span @click="onDetail(item)">{{item}}</span>
      </div>
    </div>
    <div class="func-recent">
      <div v-for="(item, index) of recentReadingArr"
           :key="index">
        <span class="list-index">{{index + 1}}</span>
        <span @click="onDetail(item.bookName)">{{item.bookName}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import novel from '../../../api/novel'

export default {
  name: 'FuncPart',
  created () {
    this.fetchMark()
    this.fetchRecent()
  },
  data () {
    return {
      recentReadingArr: [],
      markArr: [],
      firstMarkNovelImg: ''
    }
  },
  methods: {
    fetchRecent () {
      novel
        .fetchReadingMark()
        .then(res => {
          if (res.status === 200) {
            this.recentReadingArr = res.data.data
          }
        })
    },
    fetchMark () {
      novel
        .fetchBookMark()
        .then(res => {
          if (res.status === 200) {
            this.markArr = res.data.data.bookCollections
            this.firstMarkNovelImg = res.data.data.firstBookImg
          }
        })
    },
    onDetail (item) {
      novel
        .books({ bookName: item, listPage: 1, listLimit: 10 })
        .then(res => {
          // TODO: 暂未处理数组无元素的情况
          if (res.status === 200) {
            sessionStorage.setItem('bookInfo', JSON.stringify(res.data.data[0]))
            this.$router.push({
              name: 'Chapter'
            })
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/less/pageless/index/FunctionPart.less";
</style>
