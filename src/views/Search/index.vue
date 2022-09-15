<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model="keyword"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <component
      :is="componentName"
      :keyword="keyword"
      @change-keyword=";[(keyword = $event), (isShowSearchResult = true)]"
    ></component>

    <!-- <search-history></search-history>
    <search-result></search-result>
    <search-suggestion></search-suggestion> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'

export default {
  computed: {
    componentName() {
      if (this.keyword === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    },
    ...mapState(['histories'])
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keyword: '',
      isShowSearchResult: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keyword) {
      const distinctHistories = [...new Set([keyword, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.isShowSearchResult = true
      this.keyword = keyword
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
