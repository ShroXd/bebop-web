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
    <div class="item" v-for="(item, index) of items" :key="index" v-if="index !== 0">
      <span class="index">{{index + 1}}</span>
      <span class="item-name" @click="onDetail(item)">{{item}}</span>
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
  @import "../assets/less/color";

  .container {
    padding: 1rem;

    &:first-child {
      font-size: 5rem;
    }
  }

  .top {
    display: grid;
    grid-template-columns: 20% auto;
    grid-column-gap: 15px;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid  var(--sys_dividers);
  }

  .item-name {
    cursor: pointer;
    color: var(--sys_title);

    &:hover {
      color: var(--sys_title-active);
    }
  }

  .item-des {
    font-size: 0.9rem;
    color: var(--sys_secondary-text);
    margin-top: 1.1rem;
  }

  .item {
    cursor: pointer;
    margin-bottom: .2rem;

    &:hover {
      color: var(--sys_title-active);
    }
  }

  .index {
    font-size: 1.2rem;
    margin-right: .3rem;
    color: var(--sys_main);
  }
</style>
