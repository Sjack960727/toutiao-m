<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>count *10={{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点击count+1</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
console.log(mapState(['count']))
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // },
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style lang="less">
.box {
  width: 2rem;
  height: 2rem;
  background-color: green;
}
</style>
