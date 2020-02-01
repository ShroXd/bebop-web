<template>
  <div class="technics-container">
    <div class="func-btn-container">
      <v-btn class="func-btn"
             tile
             color="indigo"
             dark
             @click="changeRandomInfo">换一组</v-btn>
    </div>
    <v-row>
      <v-col cols="12"
             sm="4"
             v-for="(item, index) in results"
             :key="index">

        <v-card class="card"
                max-width="344">
          <v-card-subtitle>前端</v-card-subtitle>
          <v-card-text class="card-des">{{item.desc}}</v-card-text>

          <v-card-actions>
            <v-btn class="text-btn"
                   text
                   @click="jumpToWeb(item)">查看
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- <v-btn class="text-btn"
             text
             @click="jumpToWeb(item)">
        <v-icon class="icon"
                color="indigo darken-2">mdi-web</v-icon>
        {{item.desc}}
      </v-btn> -->
      </v-col>
    </v-row>

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
      num: 9,
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
        })
    },
    jumpToWeb (i) {
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
@import "../../../assets/less/pageless/index.less";
</style>
