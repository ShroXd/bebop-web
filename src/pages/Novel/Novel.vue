<template>
  <div class="portal">
    <div class="novel-container">
      <v-hover v-slot:default="{ hover }" v-for="(item, index) in novels" :key=index>
        <v-card class="n-card" max-width="500" :elevation="hover ? 12 : 2">
          <v-row class=n-row>
            <v-col class="img-col" cols="4">
              <v-img height="200" width="150" :src="item.imageUrl"></v-img>
              <div class="c-btn">
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn text color="primary" @click="onDetail(item)">进入坦克</v-btn>
              </div>
            </v-col>
            <v-col>
              <v-card-title>{{item.bookName}}</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="c-text">{{item.bookSimpleDes}}t</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-hover>
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
      novel.list()
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

  .navbar {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .novel-container {
    overflow: scroll;
    height: e("calc(100vh - 100px)");
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;

    .n-card {
      margin-left: 1rem;
      margin-top: 1rem;
      padding-bottom: 0.4rem;

      .n-row {
        height: 16rem;

        .c-text {
          font-size: 0.8rem;
          color: #8e8e93;
        }
      }

      .c-btn {
        margin-top: 0.6rem;
        margin-left: 0.4rem;
      }

      .img-col {
        margin-left: 1rem;
      }
    }
  }

</style>
