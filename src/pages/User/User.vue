<template>
  <div class="user-container">
    <v-card outlined>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">个人信息</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <div class="user-info">
        <v-img class="user-info__img"
               height="100"
               width="100"
               src="https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2020-04-26-nUvAU1.jpg"></v-img>
        <div>
          <div class="user-info__name">
            <div class="user-info__field">用户名：</div> {{userInfo}}
          </div>
          <div class="user-info__signature">
            <div class="user-info__field">个性签名：</div> 123
          </div>
        </div>
      </div>
    </v-card>
    <div class="user__personal">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">我的收藏</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <items-list :first-item="firstCollections" :items="booksCollections"></items-list>
      </v-card>
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">阅读记录</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <items-list :first-item="firstMark" :items="readingMark"></items-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import novel from '../../api/novel'
import user from '../../api/user'
import ContentCard from '../../components/ContentCard'
import ItemsList from '../../components/ItemsList'
import {httpCode} from '../../utils/utils'

export default {
  name: 'User',
  components: {ItemsList, ContentCard},
  comments: {
    ContentCard,
    ItemsList
  },
  created () {
    this.fetchMark()
    this.fetchRecent()
    this.fetchUserInfo()
  },
  mounted () {
    this.$EventBus.$on('detail', (val) => {
      this.onDetail(val)
    })
  },
  data () {
    return {
      userInfo: '',
      firstCollections: {
        name: '',
        img: '',
        des: ''
      },
      firstMark: {
        name: '',
        img: '',
        des: ''
      },
      booksCollections: [],
      readingMark: []
    }
  },
  methods: {
    fetchRecent () {
      novel
        .fetchReadingMark()
        .then(res => {
          this.readingMark = res.data.data
          this.fetchBookInfo(this.readingMark[0]['bookName'], this.firstMark)
        }).catch(error => {
          switch (error.response.status) {
            case httpCode['Not Found']:
              // 未找到数据
              break
          }
        })
    },
    fetchMark () {
      novel
        .fetchBookMark()
        .then(res => {
          this.booksCollections = res.data.data
          this.fetchBookInfo(this.booksCollections[0]['bookName'], this.firstCollections)
        }).catch(error => {
          switch (error.response.status) {
            case httpCode['Not Found']:
              // 未找到数据
              break
          }
        })
    },
    fetchBookInfo (bookName, target) {
      novel
        .books({
          bookName: bookName,
          listPage: 1,
          listLimit: 10
        }).then(res => {
          let info = res.data.data.books[0]
          target.name = info['bookName']
          target.img = info['imageUrl']
          target.des = info['bookSimpleDes']
        })
    },
    fetchUserInfo () {
      user.fetchUserInfo()
        .then(res => {
          if (res.status === 200) {
            this.userInfo = res.data.data.username
          }
        })
    },
    onDetail (bookName) {
      novel
        .books({bookName: bookName, listPage: 1, listLimit: 10})
        .then(res => {
          // TODO: 暂未处理数组无元素的情况
          if (res.status === 200) {
            sessionStorage.setItem('bookInfo', JSON.stringify(res.data.data.books[0]))
            this.$router.push({
              name: 'Chapter'
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/pageless/user.less";
</style>
