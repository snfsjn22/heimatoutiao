<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->

    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-iconfontlishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- /导航 -->
    <!-- 单元格导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
      center
    />
    <!-- /单元格导航 -->
  </div>
</template>

<script>
// 引入mapState计算属性
import { mapState } from 'vuex'
// 引入获取用户信息模块
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  created() {
    // 用户登录，请求用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout() {
      // 是否退出登录提示
      this.$dialog
        .confirm({
          title: '确认退出？'
        })
        .then(() => {
          // on confirm
          // console.log('确认执行这里')
          // 确认退出: 清除登陆状态
          // 包括容器中的user和localStorage中的user
          this.$store.commit('SET_USER', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
      // 并清除登录状态
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style socped lang="less">
.my-container {
  .header {
    height: 181px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-info {
    .base-info {
      height: 116px;
      padding: 38px 16px 13px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 66px;
          height: 66px;
          border: 2px solid #fff;
          margin-right: 11px;
        }

        .name {
          font-size: 15px;
          color: #fff;
        }
      }
    }

    .data-status {
      display: flex;

      .data-item {
        height: 66px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
  }

  .grid-nav {
    margin-bottom: 5px;
    .grid-item {
      height: 70px;
      .iconfont {
        font-size: 23px;
      }
      .icon-shoucang {
        color: #ec5758;
      }
      .icon-iconfontlishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 14px;
      }
    }
  }

  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 67px;
      height: 67px;
    }
    span.text {
      font-size: 15px;
      color: #fff;
    }
  }

  .logout-cell {
    height: 50px;
    text-align: center;
    color: #eb5253;
    margin: 5px 0;
    font-size: 15px;
  }
}
</style>
