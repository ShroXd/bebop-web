<template>
  <div class="gank-web-container">
    <div v-for="(item, index) in results"
         :key="index">
      <v-btn class="text-btn"
             text
             @click="jumpToWeb(item)">
        <v-icon class="icon"
                color="indigo darken-2">mdi-web</v-icon>
        {{item.desc}}
      </v-btn>
    </div>
    <v-btn class="ctl-btn"
           small
           @click="changeRandomInfo">换一组</v-btn>
  </div>
</template>

<script>
import ganhuo from '../../../api/public_api/ganhuo'
export default {
  name: 'GankWeb',
  created () {
    this.fetchWebGank()
  },
  data () {
    return {
      classify: '前端',
      num: 4,
      page: 1,
      results: []
    }
  },
  methods: {
    fetchWebGank () {
      let param = {
        classify: this.classify,
        num: this.num,
        page: this.page
      }

      ganhuo
        .gankWeb(param)
        .then(res => {
          this.results = res.data.results
          console.log(res.data.results)
        })
    },
    jumpToWeb (i) {
      console.log(i.url)

      window.open(i.url, '_blank')
    },
    changeRandomInfo () {
      this.page = this.andomNum(1, 20)
      this.fetchWebGank()
    },
    andomNum (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/home.less";
</style>
