<template>
  <div class="novel-container">
    <div class="novel-search">
      <v-text-field v-model="bookName"
                    :loading="loading"
                    @change="onSearch(bookName)"
                    label="搜索小说"
                    clearable
                    dense></v-text-field>
      <div class="novel-search-btn">
        <v-btn color="primary"
               @click="onSearch(bookName)">搜索</v-btn>
        <v-btn @click="onSearch()">重置</v-btn>
      </div>
    </div>
    <div class="novel-list">
      <span v-if="novels.length === 0 && !loading">暂无资源</span>
      <div class="novel-card"
           v-if="novels.length === 0 && loading">
        <v-skeleton-loader max-width="160"
                           type="card"></v-skeleton-loader>
      </div>
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
      <v-pagination v-model="page"
                    :length="total"
                    :total-visible="8"
                    @input="fetchNovelList({bookName: bookName, listPage: page, listLimit: limit})"></v-pagination>
    </div>
  </div>
</template>

<script>
import novel from '../../../api/novel'

export default {
  name: 'LightNovel',
  created () {
    this.fetchNovelList({ bookName: '', listPage: this.page, listLimit: this.limit })
  },
  data () {
    return {
      bookName: '',
      loading: false,
      novels: [],
      page: 1,
      total: 1,
      limit: 20,
      dialog: false
    }
  },
  methods: {

    fetchNovelList (query) {
      this.loading = true
      this.novels = []
      novel
        .books(query)
        .then(res => {
          this.novels = res.data.data
          this.total = res.data.total
        })
        .finally(e => {
          this.loading = false
        })
    },

    onSearch (bookName) {
      this.bookName = bookName
      this.page = 1
      this.fetchNovelList({ bookName: bookName, listPage: 1, listLimit: this.limit })
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
