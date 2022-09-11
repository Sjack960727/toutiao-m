<template>
  <div>
    <article-item v-for="item in articleList" :key="item.art_id" :article='item'></article-item>
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
      articleList: []
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articleList = data.data.results
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

<style></style>
