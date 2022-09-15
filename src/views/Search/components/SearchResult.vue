<template>
  <div class="results">
    <van-list
      @load="getResults"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，请重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleid: item.art_id
            }
          })
        "
      ></van-cell
    ></van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perpage: 10,
      results: []
    }
  },
  methods: {
    async getResults() {
      try {
        const { data } = await getResultsAPI(
          this.page++,
          this.perpage,
          this.keyword
        )

        if (data.data.results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...data.data.results]
        this.loading = false
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style socped lang="less">
.results {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
