<template>
  <v-container class="xuan-du-contanier">
    <div class="btn-container">
      <div class="class-btn"
           v-for="(item, index) of mainClass"
           :key="index">
        <v-btn class="ma-2"
               tile
               outlined
               color="secondary">{{item.name}}
        </v-btn>
      </div>
    </div>
  </v-container>

</template>

<script>
// import ganhuo from '../../../api/public_api/ganhuo'
export default {
  name: 'xiandu',
  data () {
    return {
      mainClass: [
        {
          name: '科技资讯',
          en_name: 'wow'
        },
        {
          name: '趣味软件 / 游戏',
          en_name: 'apps'
        },
        {
          name: '装备党',
          en_name: 'imrich'
        },
        {
          name: '草根新闻',
          en_name: 'funny'
        },
        {
          name: 'Android',
          en_name: 'android'
        },
        {
          name: '创业新闻',
          en_name: 'diediedie'
        },
        {
          name: '独立思想',
          en_name: 'thinking'
        },
        {
          name: 'IOS',
          en_name: 'iOS'
        },
        {
          name: '团队博客',
          en_name: 'teamblog'
        }
      ]
    }
  },
  created () {
    this.fetchMainCategories()
  },
  methods: {

    jumpToWeb (i) {
      window.open(i.url, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/index.less";
</style>
