<template>
  <div>
    <div class="novel-list-container">
      <div v-for="(item, index) in novels"
           :key="index">

        <div class="novel-card"
             @click="onDetail(item)">
          <v-img class="novel-img"
                 max-height="180"
                 max-width="120"
                 :src="item.imageUrl">
            <div class="mask">
              <div class="mask-info"><span class="mask-title">文库：</span>{{item.bookCategory}}</div>
              <div class="mask-info"><span class="mask-title">字数：</span>{{item.bookWordCount}} 字</div>
            </div>
          </v-img>
          <v-card-title class="novel-title font-weight-medium">{{
              item.bookName
            }}</v-card-title>
        </div>
      </div>
      <v-pagination v-model="page"
                    :length="totalPageNum"
                    :total-visible="8"
                    @input="fetchNovelList({page: page, limit: limit})"
                    circle></v-pagination>
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
import novel from '../../../api/novel'
import DetailCard from '../../../components/DetailCard'

export default {
  name: 'NovelList',
  components: {
    DetailCard
  },
  created () {
    this.fetchNovelList({ page: 1, limit: this.limit })
  },
  data () {
    return {
      novels: [],
      detail: {},
      info: {},
      bookInfo: {},
      page: 1,
      totalPageNum: 1,
      limit: 15,
      dialog: false
    }
  },
  methods: {
    fetchNovelList (query) {
      novel
        .list(query)
        .then(res => {
          this.novels = res.data.rows
          this.totalPageNum = res.data.total
        })
    },

    onDetail (item) {
      this.bookInfo = item
      this.dialog = !this.dialog
    },

    onClose () {
      this.dialog = !this.dialog
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/novel.less";
</style>
