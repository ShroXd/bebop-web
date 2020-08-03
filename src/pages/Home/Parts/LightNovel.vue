<template>
  <div class="container">
    <!--    <div class="search">-->
    <!--      <v-text-field v-model="bookName"-->
    <!--                    :loading="loading"-->
    <!--                    @change="onSearch(bookName)"-->
    <!--                    label="搜索小说"-->
    <!--                    clearable-->
    <!--                    dense></v-text-field>-->
    <!--      <div class="search__btn-group">-->
    <!--        <v-btn color="primary"-->
    <!--               @click="onSearch(bookName)">搜索</v-btn>-->
    <!--        <v-btn @click="onSearch()">重置</v-btn>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="novel-list">
      <span v-if="novels.length === 0 && !loading">暂无资源</span>
      <!--<div class="novel"
           v-if="novels.length === 0 && loading">
        <v-skeleton-loader max-width="160"
                           type="card"></v-skeleton-loader>
      </div>-->
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
            <div class="info__library"><div class="field-title">文库：</div>{{item.bookCategory}}</div>
            <div class="info__word-count"><div class="field-title">字数：</div>{{item.bookWordCount}}</div>
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
  .novel-list {
    display: grid;
    grid-template-columns: repeat(2, 49%);
    grid-column-gap: 15px;
    grid-row-gap: 20px;
  }

  .novel {
    border-bottom: 1px solid #eeeeee;
    padding: 5px 5px 1rem;
    display: grid;
    grid-template-columns: 20% auto;
  }

  .info__title {
    color: #1966c0;
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    cursor: pointer;

    &:hover {
      color: #5cbbf6;
    }
  }

  .info__library, .info__word-count {
    display: inline-block;
    margin-right: 1rem;
  }

  .field-title {
    color: #888888;
    display: inline-block;
  }

  .info-des {
    color: #888888;
    font-size: 0.9rem;
    margin-top: 0.4rem;
  }

  .pagination {
    margin-top: 1.4rem;
  }

</style>
