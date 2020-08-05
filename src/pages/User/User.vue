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
        <items-list :first-item="firstMark" :items="markBooks"></items-list>
      </v-card>
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">阅读记录</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <items-list :first-item="firstRecord" :items="recentReadingBooks"></items-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import novel from '../../api/novel'
import user from '../../api/user'
import ContentCard from '../../components/ContentCard'
import ItemsList from '../../components/ItemsList'

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
      firstMark: {
        name: '',
        img: '',
        des: ''
      },
      firstRecord: {
        name: '',
        img: '',
        des: ''
      },
      markBooks: [],
      recentReadingBooks: []
    }
  },
  methods: {
    fetchRecent () {
      novel
        .fetchReadingMark()
        .then(res => {
          if (res.status === 200) {
            let response = res.data.data
            response.bookRecentReading.forEach((element) => {
              this.recentReadingBooks.push(element['bookName'])
            })
            this.firstRecord.name = response.bookRecentReading[0]['bookName']
            this.firstRecord.img = response.firstRecordImg
            this.firstRecord.des = response.firstRecordDes
          }
        })
    },
    fetchMark () {
      novel
        .fetchBookMark()
        .then(res => {
          if (res.status === 200) {
            let response = res.data.data
            this.markBooks = res.data.data.bookCollections
            this.firstMark.name = response.bookCollections[0]
            this.firstMark.img = response.firstBookImg
            this.firstMark.des = response.firstBookDes
          }
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
    onDetail (item) {
      novel
        .books({bookName: item, listPage: 1, listLimit: 10})
        .then(res => {
          // TODO: 暂未处理数组无元素的情况
          if (res.status === 200) {
            sessionStorage.setItem('bookInfo', JSON.stringify(res.data.data[0]))
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
