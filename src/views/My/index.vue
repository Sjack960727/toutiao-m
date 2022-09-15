<template>
  <div class="profile">
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
              ><van-button
                size="mini"
                class="editbtn"
                round
                @click="$router.push('/user')"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row
          ><van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>
                {{ userInfo.art_count }}
              </template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>{{
                userInfo.fans_count
              }}</template></van-grid-item
            ><van-grid-item text="关注"
              ><template #icon>
                {{ userInfo.follow_count }}
              </template></van-grid-item
            ><van-grid-item text="获赞"
              ><template #icon>
                {{ userInfo.like_count }}
              </template></van-grid-item
            ></van-grid
          ></van-row
        >
      </div>
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          width="1.76rem"
          height="1.76rem"
          :src="mobileSrc"
        ></van-image>
        <div class="txt">登录/注册</div>
      </div>
    </header>
    <main>
      <van-grid column-num="2" :border="false" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" value="内容" />

        <van-cell title="小智同学" value="内容" />
      </div>
    </main>
    <footer>
      <van-button
        block
        type="default"
        v-if="isLogin"
        style="color: red"
        @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/imgs/mobile.png'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'MY',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出'
        })
        .then(() => {
          // on confirm
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        // console.log(error)
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户登陆失败,请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  background-color: #f5f7f9;
  height: 100vh;
  .link {
    margin: 10px 0;
  }
  .toutiao-shoucang {
    color: red;
    font-size: 40px;
  }
  .toutiao-lishi {
    color: orange;
    font-size: 40px;
  }
}
.banner {
  width: 100%;
  height: 5.333333rem;
  background: url('@/assets/imgs/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .txt {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .van-col--12 {
    height: 100%;
  }
  .editbtn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }

  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background: inherit;
    }

    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
