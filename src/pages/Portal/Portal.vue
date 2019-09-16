<template>
  <div class="portal">
    <v-toolbar class="navbar">
      <v-toolbar-title>Bebop</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text>首页</v-btn>
        <v-btn text>归档</v-btn>
        <v-btn text>数据</v-btn>
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>mdi-export-variant</v-icon>
      </v-btn>
    </v-toolbar>
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
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{detail.bookName}}
        </v-card-title>
        <v-card-text>
          {{detail.bookSimpleDes}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false">
            好的
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer>
      <div class="flex-grow-1"></div>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
import novel from '../../api/novel'

export default {
  name: 'Entry',
  created () {
    this.fetchNovelList()
  },
  data () {
    return {
      novels: [],
      offsetTop: 0,
      dialog: false,
      detail: {}
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
      this.dialog = !this.dialog
      this.detail = item
      novel.chapter({
        bookId: item.bookId
      })
        .then((res) => {
          console.log(res.data.rows)
        })
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
