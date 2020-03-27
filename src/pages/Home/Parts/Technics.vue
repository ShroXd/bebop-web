<template>
  <div class="technics-container">
    <div class="func-btn-container">
      <div class="btn-container">
        <div v-for="(item, index) of mainClass"
             :key="index">
          <v-btn class="ma-2"
                 tile
                 dark
                 :outlined="item.name === classify ? false : true"
                 :color="item.name === classify ? 'indigo' : 'secondary'"
                 @click="selectClass(item)">{{item.name}}
          </v-btn>
        </div>
      </div>
      <div class="func-btn">
        <v-btn tile
               color="indigo"
               dark
               @click="changeRandomInfo">换一组</v-btn>
      </div>

    </div>

    <v-row v-if="results.length === 0">
      <v-col cols="12"
             sm="4">
        <v-skeleton-loader class="mx-auto"
                           max-width="300"
                           type="image, actions"></v-skeleton-loader>
      </v-col>
      <v-col cols="12"
             sm="4">
        <v-skeleton-loader class="mx-auto"
                           max-width="300"
                           type="image, actions"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"
             sm="4"
             v-for="(item, index) in results"
             :key="index">
        <v-card class="card"
                max-width="344">
          <v-card-subtitle>{{classify}}</v-card-subtitle>
          <v-card-text class="card-des">{{item.desc}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text-btn"
                   text
                   @click="jumpToWeb(item)">查看
            </v-btn>
          </v-card-actions>
        </v-card>
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
      results: [],
      mainClass: [
        {
          name: '前端',
          en_name: '前端'
        },
        /* {
          name: '福利',
          en_name: '福利'
        }, */
        {
          name: 'Android',
          en_name: 'Android'
        },
        {
          name: 'iOS',
          en_name: 'iOS'
        },
        /* {
          name: '休息视频',
          en_name: '休息视频'
        }, */
        {
          name: '拓展资源',
          en_name: '拓展资源'
        }
      ]
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
    selectClass (i) {
      this.classify = i.name
      this.fetchWebGank()
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

.technics-container {
  padding-left: 1rem;

  .func-btn-container {
    .btn-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .func-btn {
      display: flex;
      justify-content: flex-end;
      padding-right: 1rem;
    }
  }
  .card-des {
    height: 80px;
    overflow: scroll;
  }
}
</style>
