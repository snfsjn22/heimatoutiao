<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登陆表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        center
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        center
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 3"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- style="margin: 16px" -->
      <div class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请填写用户名' },
          {
            pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true, message: '请填写用户名' },
          {
            pattern: /^\d{6}$/,
            message: '验证码不能为空'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // 2. 表单验证
      // 在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        // console.log('登陆成功', res)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试', err)
        }
      }
    },
    async onSendSms() {
      // console.log('onSendSms')
      // 1.验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // console.log(123)
      // this.$refs.loginForm.validate('mobile')
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败关闭倒计时
        this.isCountDownShow = true
        console.log('发送失败', err)
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  // line-height: 45px;
  .icon-shouji {
    font-size: 19px;
    // padding: 10px;
  }
  .icon-yanzhengma {
    font-size: 19px;
  }

  .send-sms-btn {
    // width: 152px;
    // height: 46px;
    // font-style: 22px;
    background-color: #ededed;
    // line-height: 46px;
    color: #666666;
  }

  .login-btn-warp {
    padding: 26.5px 16.5px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
