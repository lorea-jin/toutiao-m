<template>
  <div class="login-container">
    <van-nav-bar title="登陆" class="page-nav-bar" />

    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-wode"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <van-count-down
          v-if="isCountDownShow"
          :time="time"
          slot="button"
          format="ss s"
          @finish="countDownFinish"
        />
        <van-button
          v-else
          slot="button"
          type="default"
          size="mini"
          round
          class="send-sms-btn"
          native-type="button"
          @click="onSendSms"
        >发送验证码</van-button>
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user.js'

export default {
  name: 'loginIndex',
  data() {
    return {
      user: {
        mobile: '138111111111',
        code: '246810'
      },

      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },

      time: 5 * 1000, // 倒计时时间
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      // 1. 表单验证
      // 2.提交表单请求登陆
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const re = await login(this.user)
        this.$store.commit('setUser', re.data)
        this.$toast.success('登陆成功')
        this.$router.push('/userprofile')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败,请稍后重试')
        }
      }
    },

    // 发送验证码
    async onSendSms() {
      // (1)校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('手机号验证失败' + error)
      }

      // (2)通过后显示倒计时
      this.isCountDownShow = true
      // (3)发送验证码
      try {
        await getCode(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          return this.$toast.fail('发送太频繁')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },

    countDownFinish() {
      this.isCountDownShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 37px;
  margin-right: 10px;
}

.login-container {
  .send-sms-btn {
    height: 46px;
    line-height: 46px;
    padding: 0px 18px;
    background-color: #ededed;
    font-size: 22px;
    color: #666666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
