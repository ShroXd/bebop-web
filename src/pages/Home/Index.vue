<template>
  <div class="index-container">
    <head-bar></head-bar>
    <div class="portal">
      <ContentCard name="小说列表">
        <light-novel></light-novel>
      </ContentCard>
    </div>
  </div>

</template>

<script>
import UserFunc from './Parts/UserFunc'
import WebTitle from './Parts/WebTitle'
import Recommend from './Parts/Recommend'
import FuncPart from './Parts/FuncPart'
import LightNovel from './Parts/LightNovel'
import XianDu from './Parts/XianDu'
import HeadBar from './Parts/HeadBar'
import ContentCard from '../../components/ContentCard'

export default {
  name: 'Novel',
  components: {
    UserFunc,
    WebTitle,
    Recommend,
    FuncPart,
    LightNovel,
    XianDu,
    HeadBar,
    ContentCard
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/pageless/index.less";
</style>
