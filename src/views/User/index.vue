<template>
  <div>
    <van-nav-bar
      class="nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- <img src="" alt="" ref="img" /> -->
    <input
      type="file"
      ref="file"
      accept="image/*"
      hidden
      @change="selectePhoto"
    />
    <van-cell title="头像" is-link>
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        alt=""
        :src="avator"
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      ><update-avator
        :photo="photo"
        v-if="isShowPhoto"
        :avator.sync="avator"
      ></update-avator>
    </van-popup>
    <van-cell title="头像" is-link></van-cell>
    <van-cell title="头像" is-link></van-cell>
    <van-cell title="头像" is-link></van-cell>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator.vue'
import { resolveToBase64 } from '@/utils'
export default {
  components: { UpdateAvator },
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avator: ''
    }
  },
  methods: {
    async selectePhoto() {
      const file = this.$refs.file.files[0]
      console.log(file)

      //   this.photo = window.URL.createObjectURL(file)
      //   console.log(window.URL.createObjectURL(file))
      //   this.$refs.img.src = window.URL.createObjectURL(file)

      const base64 = await resolveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true
      this.$refs.file.value = ''
      //   console.log(base64)
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
