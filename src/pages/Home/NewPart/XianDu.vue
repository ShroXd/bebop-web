<template>
  <div class="xuan-du-contanier">
    <v-col class="d-flex select-container"
           cols="1"
           sm="10">
      <v-select :items="mainCategoriesSelect"
                label="Outlined style"
                outlined
                dense
                v-model="main"
                @change="fetchChildCategories()"></v-select>
      <v-select :items="childCategoriesSelect"
                label="Outlined style"
                outlined
                v-model="child"
                dense></v-select>
      <v-btn color="primary"
             @click="fetchXianDu()">搜索</v-btn>
    </v-col>

    <div class="card-container">
      <div v-for="(item, index) in content"
           :key="index">
        <v-card class="mx-auto"
                max-width="344"
                outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{item.site.name}}</v-list-item-title>
              <v-list-item-subtitle>{{item.title}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile
                                size="80"
                                color="grey">
              <v-img :src="item.site.icon"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text
                   @click="jumpToWeb(item)">查看</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>

</template>

<script>
import ganhuo from '../../../api/public_api/ganhuo'
export default {
  name: 'xiandu',
  data () {
    return {
      main: '',
      child: '',
      mainCategoriesSelect: [],
      mainCategories: [],
      childCategoriesSelect: [],
      childCategories: [],
      content: []
    }
  },
  created () {
    this.fetchMainCategories()
  },
  methods: {
    fetchMainCategories () {
      ganhuo
        .xianduMain()
        .then(res => {
          if (!res.error) {
            for (let item of res.data.results) {
              this.mainCategoriesSelect.push(item.name)
            }
            this.mainCategories = res.data.results
          }
        })
    },
    fetchChildCategories () {
      let that = this
      that.childCategoriesSelect = []
      that.childCategories = []
      let main = this.mainCategories.filter(item => {
        return item.name === that.main
      })
      let param = {
        item: main[0].en_name
      }
      ganhuo
        .xianduChild(param)
        .then(res => {
          if (!res.error) {
            for (let item of res.data.results) {
              this.childCategoriesSelect.push(item.title)
            }
            this.childCategories = res.data.results
          }
        })
    },
    fetchXianDu () {
      let that = this
      let theClass = this.childCategories.filter(item => {
        return item.title === that.child
      })

      console.log(theClass)
      let param = {
        class: theClass[0].id,
        num: 6,
        page: 1
      }
      ganhuo
        .xiandu(param)
        .then(res => {
          if (!res.error) {
            this.content = res.data.results
          }
        })
    },
    jumpToWeb (i) {
      window.open(i.url, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/home.less";
</style>
