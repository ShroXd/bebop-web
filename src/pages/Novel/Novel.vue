<template>
  <div class="portal">
    <div class="novel-container">
      <div v-for="(item, index) in novels" :key=index>
        <v-hover v-slot:default="{ hover }">
          <v-card class="n-card" max-width="180" height="320" :elevation="hover ? 4 : 1" @click="onDetail(item)">
            <v-img class="n-img white--text" height="200px" :src="item.imageUrl"></v-img>
            <v-card-title class="n-title font-weight-medium">{{item.bookName}}</v-card-title>
          </v-card>
        </v-hover>
      </div>
    </div>
    <v-dialog v-model="dialog" width="1300">
      <novel-detail :bookInfo.sync="bookInfo" v-if="dialog" @close="onClose"></novel-detail>
    </v-dialog>
    <v-footer>
      <div class="flex-grow-1"></div>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
import novel from '../../api/novel'
import NovelDetail from './NovelDetail'

export default {
  name: 'Novel',
  components: {
    NovelDetail
  },
  created () {
    this.fetchNovelList()
  },
  data () {
    return {
      novels: [],
      offsetTop: 0,
      dialog: false,
      isDetailShow: false,
      detail: {},
      info: {},
      bookInfo: {}
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },

    fetchNovelList () {
      novel.list({
        page: 1,
        limit: 5
      })
        .then((res) => {
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
  @import "../../assets/less/color.less";

  .novel-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0.8rem 0.6rem;

    .n-card {
      overflow: hidden;
      box-sizing: border-box;
      margin: 0.6rem 0.8rem;
      width: 20rem;

      .n-title {
        font-size: 1rem;
        color: @_sys-light-black;
        overflow: hidden;
      }

      .n-img {
        border-bottom: 1px solid @_sys-mid-light-gray;
        margin: 0 0.4rem 2rem;
      }
    }

    .n-card:hover {
      cursor: pointer;
    }
  }

</style>
