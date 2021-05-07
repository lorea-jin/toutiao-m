<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>

    <!-- 标签导航栏 -->
    <van-tabbar v-model="active" class="nav-bar">
      <van-tabbar-item icon="wap-home-o" to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/QA">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="tv-o" to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/userprofile">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span>{{ user ? '我的' :'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  props: {},
  components: {},
  data() {
    return {
      active: 3
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {
    ...mapState(['user'])
  },
  filters: {}
}
</script>

<style scoped lang='less'>
.nav-bar {
  .iconfont {
    font-size: 40px;
  }

  span {
    font-size: 20px;
  }
}
</style>
