<template>
  <div>
    <van-cell
      v-for="(item, index) in heihLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keyword',suggestions[index])"
      ><template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    heihLightSuggestions() {
      const reg = new RegExp(this.keyword, 'ig')

      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style='color:red'>${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keyword)
        // console.log(data)
        //   this.suggestions = data.data.options.filter((item) => Boolean(item))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取提示失败')
        } else {
          throw Error
        }
      }
    }, 500)
  }
}
</script>

<style></style>
