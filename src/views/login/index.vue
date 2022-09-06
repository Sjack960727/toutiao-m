<template>
  <div>
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="phoneNum"
        name="phoneNum"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式错误'
          }
        ]"
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
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]"
      >
        <template #label>
          <div>
            <span class="toutiao toutiao-yanzhengma"></span>
          </div> </template
      ></van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNum: '',
      code: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
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
</style>
