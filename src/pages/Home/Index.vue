<template>
  <div class="index-container">
    <div class="portal">
      <ContentCard name="小说列表">
        <light-novel></light-novel>
      </ContentCard>
    </div>
  </div>

</template>

<script>
import UserFunc from './Parts/UserFunc'
import FuncPart from './Parts/FuncPart'
import LightNovel from './Parts/LightNovel'
import ContentCard from '../../components/ContentCard'

export default {
  name: 'Novel',
  components: {
    UserFunc,
    FuncPart,
    LightNovel,
    ContentCard
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/pageless/index.less";
</style>
