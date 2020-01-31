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
           @click="toBack">向后</v-btn>
    <v-btn class="ctl-btn"
           small
           @click="toPre">向前</v-btn>
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
    toPre () {
      if (this.page === 1) {
        return
      }
      this.page -= 1
      this.fetchWebGank()
    },
    toBack () {
      this.page += 1
      this.fetchWebGank()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/home.less";
</style>
