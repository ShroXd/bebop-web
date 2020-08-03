<template>
  <div class="user-container">
    <ContentCard name="用户信息">
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
    </ContentCard>
    <div class="user__personal">
      <ContentCard name="我的收藏">
        <div class="mark">
          <div class="top">
            <v-img class="novel-img"
                   height="140"
                   width="100"
                   :src="firstMark.img"></v-img>
            <div>
              <div class="item-name" @click="onDetail(firstMark.name)">{{firstMark.name}}</div>
              <div class="item-des">{{firstMark.des}}</div>
            </div>
          </div>
          <div class="item" v-for="(item, index) of markBooks" :key="index" v-if="index !== 0">
            <span class="index">{{index + 1}}</span>
            <span @click="onDetail(item)">{{item}}</span>
          </div>
        </div>
      </ContentCard>
      <ContentCard name="阅读记录">
        <div class="record">
          <div class="top">
            <v-img class="novel-img"
                   height="140"
                   width="100"
                   :src="firstRecord.img"></v-img>
            <div>
              <div class="item-name" @click="onDetail(firstRecord.name)">{{firstRecord.name}}</div>
              <div class="item-des">{{firstRecord.des}}</div>
            </div>
          </div>
          <div class="item" v-for="(item, index) of recentReadingBooks" :key="index" v-if="index !== 0">
            <span class="index">{{index + 1}}</span>
            <span @click="onDetail(item.bookName)">{{item.bookName}}</span>
          </div>
        </div>
      </ContentCard>
    </div>
  </div>
</template>

<script>
import novel from '../../api/novel'
import user from '../../api/user'
import ContentCard from '../../components/ContentCard'

export default {
  name: 'User',
  components: {ContentCard},
  comments: {
    ContentCard
  },
  created () {
    this.fetchMark()
    this.fetchRecent()
    this.fetchUserInfo()
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
            this.recentReadingBooks = response.bookRecentReading
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
