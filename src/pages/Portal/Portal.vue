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
    <v-div class="novel-container">
      <v-hover v-slot:default="{ hover }" v-for="(item, index) in novels" :key=index>
        <v-card class="n-card" max-width="344" :elevation="hover ? 12 : 2">
          <v-card-title>{{item.title}}</v-card-title>
          <v-card-text>{{item.des}}t</v-card-text>
        </v-card>
      </v-hover>
    </v-div>
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
      offsetTop: 0
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
    height: e('calc(100vh - 100px)');
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;

    .n-card {
      margin-left: 1rem;
      margin-top: 1rem;
    }
  }

</style>
