<template>
  <div class="container">
    <div class="novel-list">
      <span v-if="novels.length === 0 && !loading">暂无资源</span>
      <div v-for="(item, index) in novels"
           :key="index">
        <div class="novel"
             @click="onDetail(item)">
          <v-img class="novel-img"
                 height="140"
                 width="100"
                 :src="item.imageUrl">
          </v-img>
          <div class="novel-info">
            <div class="info__title">{{item.bookName}}</div>
            <div class="info__library">
              <div class="field-title">文库：</div>
              {{item.bookCategory}}
            </div>
            <div class="info__word-count">
              <div class="field-title">字数：</div>
              {{item.bookWordCount}}
            </div>
            <div class="info-des">
              {{item.bookSimpleDes}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-pagination class="pagination"
                  v-model="page"
                  :length="total"
                  :total-visible="14"
                  @input="fetchNovelList({bookName: bookName, listPage: page, listLimit: limit})"></v-pagination>
  </div>
</template>

<script>
import novel from '../../../api/novel'
import ContentCard from '../../../components/ContentCard'

export default {
  name: 'LightNovel',
  components: {ContentCard},
  comments: {
    ContentCard
  },
  created () {
    this.fetchNovelList({bookName: '', listPage: this.page, listLimit: this.limit})
  },
  mounted () {
    this.$EventBus.$on('search', (name) => {
      this.onSearch(name)
    })
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
      this.fetchNovelList({bookName: bookName, listPage: 1, listLimit: this.limit})
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
  @import "../../../assets/less/pageless/light-novel.less";
</style>
