<template>
  <div class="search-part">
    <v-col class="search-input"
           md="10">
      <v-text-field v-model="search"
                    :loading="loading"
                    @change="onSearch"
                    label="搜索小说"
                    clearable
                    dense></v-text-field>

    </v-col>
  </div>
</template>

<script>
import { globalBus } from '../../../plugins/globalBus'

export default {
  name: 'Search',
  data () {
    return {
      loading: false,
      search: ''
    }
  },
  methods: {
    onSearch () {
      console.log(this.search)
      globalBus.$emit('onSearch', this.search)
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
</style>
