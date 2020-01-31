<template>
  <div class="sentence-container">
    <div class="hitokoto">{{hitokoto}}</div>
    <div class="from">———{{creator}}《{{from}}》</div>
  </div>
</template>

<script>
import sentence from '../../../api/public_api/sentence'
export default {
  name: 'sentence',
  data () {
    return {
      hitokoto: '',
      creator: '',
      from: ''
    }
  },
  created () {
    this.fetchHitokoto()
  },
  methods: {
    fetchHitokoto () {
      let param = {
        c: 'b'
      }

      sentence
        .hitokoto(param)
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.hitokoto)
            console.log(res.data.from)
            console.log(res.status)
            this.hitokoto = res.data.hitokoto
            this.creator = res.data.creator
            this.from = res.data.from
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/pageless/home.less";
</style>
