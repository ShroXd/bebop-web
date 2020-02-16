<template>
  <div>
    <div class="novel-list-container">
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
                    :length="totalPageNum"
                    :total-visible="8"
                    @input="fetchNovelList({name: name, page: page, limit: limit})"></v-pagination>
    </div>

    <v-dialog v-model="dialog"
              width="1300">
      <detail-card :bookInfo.sync="bookInfo"
                   v-if="dialog"
                   @close="onClose"></detail-card>
    </v-dialog>
  </div>
</template>

<script>
import { globalBus } from '../../../plugins/globalBus'
import novel from '../../../api/novel'
import DetailCard from '../../../components/DetailCard'

export default {
  name: 'LightNovel',
  components: {
    DetailCard
  },
  created () {
    this.fetchNovelList({ page: 1, limit: this.limit })
    this.onSearch()
  },
  data () {
    return {
      novels: [],
      detail: {},
      info: {},
      bookInfo: {},
      name: '',
      page: 1,
      totalPageNum: 1,
      limit: 12,
      dialog: false
    }
  },
  methods: {
    fetchNovelList (query) {
      novel
        .list(query)
        .then(res => {
          this.novels = res.data.data.rows
          this.totalPageNum = res.data.data.total
          globalBus.$emit('resetLoading')
        })
    },

    onSearch () {
      globalBus.$on('onSearch', (name) => {
        this.name = name
        this.page = 1
        this.fetchNovelList({ name: name, page: 1, limit: this.limit })
      })
    },

    onDetail (item) {
      this.$router.push({
        path: '/chapter',
        query: {
          bookId: item.bookId
        }
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
