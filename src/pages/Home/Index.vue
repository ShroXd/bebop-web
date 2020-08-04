<template>
  <div class="index-container">
    <div class="portal">
      <v-card outlined>
        <v-list-item three-line>
          <v-list-item-content>
<!--            <div class="overline mb-4">OVERLINE</div>-->
            <v-list-item-title class="headline mb-1">小说清单</v-list-item-title>
            <v-list-item-subtitle>是黑猫，不是臭鼬。请停止你们的迫害行为（认真）</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="120"
            color="grey">
            <v-img class="novel-img"
                   height="140"
                   width="100"
                   src="https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2020-04-26-nUvAU1.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-divider></v-divider>
        <light-novel></light-novel>
      </v-card>
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
