<template>
  <div class="channel-edit">
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in mychannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          :class="{ active: item.name === '推荐' }"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="推荐频道"> </van-cell>
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in this.recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('add-channel', item)"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  props: {
    mychannels: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllchannels()
  },
  methods: {
    async getAllchannels() {
      const { data } = await getAllChannelsAPI()
      this.allChannels = data.data.channels
    },
    handleMyChannel({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('del-active', id)
        // console.log(name)
      } else {
        // console.log(index)
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item1) => {
        return !this.mychannels.find((item2) => item1.id === item2.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 24px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
