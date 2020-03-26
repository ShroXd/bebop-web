<template>
  <div>
    <div class="novel-list-container">
      <template v-if="novels.length === 0">
        <v-skeleton-loader v-for="(item, index) in new Array(12)"
                           :key="index"
                           max-width="160"
                           type="card"></v-skeleton-loader>
      </template>
      <div v-for="(item, index) in novels"
           :key="index">
        <div class="novel-card"
             @click="onDetail(item)">
          <v-img class="novel-img"
                 height="180"
                 width="120"
                 :src="item.imageUrl">
            <div class="mask">
              <div class="mask-info"><span class="mask-title">文库：</span>{{item.bookCategory}}</div>
              <div class="mask-info"><span class="mask-title">字数：</span>{{item.bookWordCount}} 字</div>
            </div>
          </v-img>
          <div class="novel-title">{{item.bookName}}</div>
        </div>
      </div>
    </div>
    <v-pagination v-model="page"
                  :length="total"
                  :total-visible="8"
                  @input="fetchNovelList({bookName: bookName, listPage: page, listLimit: limit})"></v-pagination>
  </div>
</template>

<script>
import { globalBus } from '../../../plugins/globalBus'
import novel from '../../../api/novel'

export default {
  name: 'LightNovel',
  created () {
    this.fetchNovelList({ bookName: ' ', listPage: this.page, listLimit: this.limit })
    this.onSearch()
  },
  data () {
    return {
      novels: [],
      bookName: ' ',
      page: 1,
      total: 1,
      limit: 12,
      dialog: false
    }
  },
  methods: {

    fetchNovelList (query) {
      this.novels = []
      novel
        .books(query)
        .then(res => {
          this.novels = res.data.data
          this.total = res.data.total
        })
    },

    onSearch () {
      globalBus.$on('onSearch', (bookName) => {
        this.bookName = bookName
        this.page = 1
        this.fetchNovelList({ bookName: bookName, listPage: 1, listLimit: this.limit })
      })
    },

    onDetail (item) {
      sessionStorage.setItem('bookInfo', JSON.stringify(item))
      this.$router.push({
        name: 'Chapter'
      })
    },

    onClose () {
      this.dialog = !this.dialog
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/index.less";
</style>
