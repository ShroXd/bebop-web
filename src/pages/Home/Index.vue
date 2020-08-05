<template>
  <div class="index-container">
    <div class="portal">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">小说清单</v-list-item-title>
            <v-list-item-subtitle>呐呐呐呐呐呐呐呐呐呐呐呐呐呐呐呐呐呐</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <light-novel></light-novel>
      </v-card>
    </div>
  </div>

</template>

<script>
import UserFunc from './Parts/UserFunc'
import LightNovel from './Parts/LightNovel'
import ContentCard from '../../components/ContentCard'

export default {
  name: 'Novel',
  components: {
    UserFunc,
    LightNovel,
    ContentCard
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/less/pageless/index.less";
</style>
