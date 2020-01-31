<template>
  <div class="search-part">
    <v-col class="search-input"
           md="10">
      <v-text-field v-model="search"
                    :loading="loading"
                    @change="onSearch(search)"
                    label="搜索小说"
                    clearable
                    dense></v-text-field>
      <div class="func-btn">
        <v-btn color="primary"
               @click="onSearch(search)">搜索</v-btn>
        <v-btn @click="onSearch()">重置</v-btn>
      </div>
    </v-col>
  </div>
</template>

<script>
import { globalBus } from '../../../plugins/globalBus'

export default {
  name: 'Search',
  created () {
    this.resetLoading()
  },
  data () {
    return {
      loading: false,
      search: ''
    }
  },
  methods: {
    onSearch (param = '') {
      this.loading = true
      this.search = param
      globalBus.$emit('onSearch', param)
    },

    resetLoading () {
      globalBus.$on('resetLoading', () => {
        this.loading = false
      })
    }
  }

}
</script>

<style lang="less" scoped>
.search-part {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.func-btn {
  text-align: right;
}
</style>
