<template>
  <div>
    <div class="novel-list-container">
      <div v-for="(item, index) in novels"
           :key="index">

        <div class="novel-card"
             @click="onDetail(item)">
          <v-img class="novel-img"
                 height="220"
                 width="150"
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
    </div>
    <div class="text-center">
      <v-pagination v-model="page"
                    :length="100"
                    :total-visible="7"></v-pagination>
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
    this.fetchNovelList()
  },
  data () {
    return {
      novels: [],
      detail: {},
      info: {},
      bookInfo: {},
      page: 1,
      dialog: false
    }
  },
  methods: {
    fetchNovelList () {
      novel
        .list({
          page: 1,
          limit: 5
        })
        .then(res => {
          this.novels = res.data.rows
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
