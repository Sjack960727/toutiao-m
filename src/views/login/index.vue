<template>
  <div>
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <div>
            <span class="toutiao toutiao-shouji"></span>
          </div> </template
      ></van-field>

      <van-field
        v-model="code"
        name="code"
        placeholder="验证码"
        :rules="codeRules"
      >
        <template #label>
          <div>
            <span class="toutiao toutiao-yanzhengma"></span>
          </div>
        </template>
        <template #button>
          <div>
            <van-button
              type="default"
              class="btn"
              block
              round
              size="small"
              native-type="button"
              v-if="isShowBtn"
              @click="sendCode"
              >获取验证码</van-button
            >
            <van-count-down
              v-else
              :time="3 * 1000"
              format="ss秒"
              @finish="isShowBtn = true"
            />
          </div>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { Login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowBtn: true
    }
  },
  methods: {
    // 提交登录
    ...mapMutations(['SET_TOKEN']),
    async onSubmit(values) {
      // console.log('submit', values)
      console.log(mapMutations(['SET_TOKEN']))
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await Login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push({
          path: '/profile'
        })
        this.$toast.success('登录成功')
      } catch (error) {
        // this.$toast.fail('登陆失败')
        console.log(error)
        console.log(error.response)
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    // 发送验证码
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await sendCodeAPI(this.mobile)
        this.isShowBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 19;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
