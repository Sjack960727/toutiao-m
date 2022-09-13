<template>
  <div class="article">
    <van-pull-refresh v-model="isLoading" @refresh="getNextPageArticles">
      <van-list
        v-model="loading"
        @load="getNextPageArticles"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多文章了！！"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articleList"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articleList: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      isLoading: false
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getNextPageArticles() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.loading) {
          this.articleList.push(...data.data.results)
        } else {
          this.articleList.unshift(...data.data.results)
        }
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    },
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articleList = data.data.results
        this.preTimestamp = data.data.pre_timestamp
        // console.log(data)
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
