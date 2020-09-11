<template>
  <div class="container">
    <div class="top">
      <v-img class="novel-img"
             height="140"
             width="100"
             :src="firstItem.img"></v-img>
      <div>
        <div class="item-name" @click="onDetail(firstItem.name)">{{firstItem.name}}</div>
        <div class="item-des">{{firstItem.des}}</div>
      </div>
    </div>
    <v-divider class="divider"></v-divider>
    <div class="item" v-for="(item, index) of items" :key="index" v-if="index !== 0">
      <span class="index">{{index + 1}}</span>
      <span class="item-name" @click="onDetail(item.bookName)">{{item.bookName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemsList',
  props: {
    firstItem: {
      type: Object,
      default: () => {
        return ''
      }
    },
    items: {
      type: Array,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    onDetail (name) {
      this.$EventBus.$emit('detail', name)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/componentsless/items-list";
</style>
