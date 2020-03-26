<template>
  <div class="portal">
    <user-func></user-func>
    <web-title></web-title>
    <v-tabs v-model="tab"
            background-color="transparent"
            color="basil"
            right>
      <v-tab v-for="(item, index) in items"
             :key="index">
        {{ item.text }}
      </v-tab>
    </v-tabs>

    <v-tabs-items class="tabs-items"
                  v-model="tab">
      <v-tab-item>
        <light-novel></light-novel>
      </v-tab-item>
      <!-- <v-tab-item>
        <xian-du></xian-du>
      </v-tab-item> -->
      <v-tab-item>
        <technics></technics>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import UserFunc from './Parts/UserFunc'
import WebTitle from './Parts/WebTitle'
import LightNovel from './Parts/LightNovel'
import XianDu from './Parts/XianDu'
import Technics from './Parts/Technics'

export default {
  name: 'Novel',
  components: {
    UserFunc,
    WebTitle,
    LightNovel,
    XianDu,
    Technics
  },
  data () {
    return {
      tab: null,
      items: [
        {
          text: '轻小说',
          icon: 'mdi-book'
        },
        /* {
          text: '闲读',
          icon: 'mdi-book'
        }, */
        {
          text: '技术',
          icon: 'mdi-book'
        }
      ]

    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/pageless/index.less";
</style>
