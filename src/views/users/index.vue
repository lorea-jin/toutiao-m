<template>
  <div class="userprofile">
    <!-- 已登陆页面 -->
    <div v-if="user" class="alreadylogin login-header">
      <div class="upper-wrap">
        <div class="info">
          <van-image class="avator" round :src="userOwnInfo.photo" />
          <span>{{userOwnInfo.name}}</span>
        </div>
        <van-button type="default" size="mini" round class="editinfo">编辑资料</van-button>
      </div>

      <!-- 具体粉丝数 -->
      <div class="detailnumber">
        <div class="nunber-item">
          <span class="count">{{userOwnInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="nunber-item">
          <span class="count">{{userOwnInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="nunber-item">
          <span class="count">{{userOwnInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="nunber-item">
          <span class="count">{{userOwnInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录页面 -->
    <div v-else class="notlogin login-header">
      <img src="@/assets/mobile.png" @click="$router.push('/login')" />
      <span>登陆 / 注册</span>
    </div>

    <!-- 宫格 -->
    <van-grid :column-num="2">
      <van-grid-item icon="star-o" text="收藏" class="star" />
      <van-grid-item icon="underway-o" text="历史" class="history" />
    </van-grid>

    <!-- cell -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <!-- 退出登录 -->
    <van-button v-if="user" type="default" size="large" class="logout-btn" @click="logoutBtn">退出登陆</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMyInfo } from '@/api/user.js'

export default {
  name: 'userProfileIndex',
  props: {},
  components: {},
  data() {
    return {
      userOwnInfo: {} // 用户自己的信息
    }
  },
  methods: {
    async logoutBtn() {
      try {
        await this.$dialog.confirm({
          title: '确认退出吗？'
        })
        this.$store.commit('removeUser')
        this.$router.push('/login')
      } catch (error) {
        console.log('cancel')
      }
    },

    async getMyInfo() {
      try {
        const re = await getMyInfo()
        this.userOwnInfo = re.data
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    }
  },
  created() {
    if (this.user) {
      this.getMyInfo()
    }
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState(['user'])
  },
  filters: {}
}
</script>

<style scoped lang='less'>
.login-header {
  width: 100%;
  height: 360px;
  background: url('~@/assets/banner.png');
  background-size: contain;
}

.notlogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    color: #fff;
    font-size: 28px;
  }
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 12px;
  }
}

.star {
  color: #eb5253;
}

.history {
  color: #ff9f21;
}

.van-cell-group {
  margin: 5px 0;
}
.van-cell {
  font-size: 30px;
  height: 100px;
  line-height: 80px;
}

.logout-btn {
  width: 100%;
  height: 104px;
  line-height: 104px;
  color: #d86262;
}
.alreadylogin {
  padding: 0 32px;
  .upper-wrap {
    height: 231px;
    padding: 75px 0 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      align-items: center;

      span {
        font-size: 30px;
        color: #fff;
        margin-left: 20px;
      }
    }
    .avator {
      width: 104px;
      height: 104px;
      border-radius: 50%;
      border: 1px solid #fff;
    }

    .editinfo {
      height: 32px;
      font-size: 20px;
      padding: 0 15px;
    }
  }
}

.detailnumber {
  display: flex;
  height: 130px;
  align-items: center;
  justify-content: space-around;

  .nunber-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .count {
    font-size: 36px;
  }
  .text {
    font-size: 23px;
  }
}
</style>
