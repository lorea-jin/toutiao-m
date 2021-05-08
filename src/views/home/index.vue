<template>
  <div class="home-container">
    <!-- 搜索-->
    <van-nav-bar class="page-nav-bar search-wrap" fixed>
      <van-button slot="title" type="info" round icon="search" class="searchNav">搜索</van-button>
    </van-nav-bar>

    <!-- 标签页 -->
    <van-tabs v-model="active" class="tab-wrap" swipeable>
      <van-tab :title="item.name" :key="item.id" v-for="item in channels">
        <!-- list组件 -->
        <articleList :channelinfo="item"></articleList>
      </van-tab>

      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="hamburger-btn" @click="showhamberger">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="channelChooseShow"
      position="bottom"
      :style="{ height: '100%'  }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :mychannel="channels"
        @changeActive="changeActive"
        @closepopup=" channelChooseShow = false"
        :activeIndex="active"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import articleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getToken } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  props: {},
  components: {
    articleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      channelChooseShow: false
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    // 获取用户频道列表
    async getChannels() {
      try {
        // 是否已经登陆
        if (this.user) {
          const re = await getChannels()
          this.channels = re.data.channels
        } else {
          // 未登录
          const localChannels = getToken('mylocalchannels')

          if (localChannels) {
            // 有本地频道数据，则使用
            this.channels = localChannels
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const re = await getChannels()
            this.channels = re.data.channels
          }
        }
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    },

    showhamberger() {
      this.channelChooseShow = true
    },

    // 子组件中点击了频道后通知父组件的事件
    changeActive(item) {
      this.active = item
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
.home-container {
  padding-top: 180px;
  padding-bottom: 100px;
}
.search-wrap {
  height: 98px;

  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .van-button {
    min-width: 555px;
    height: 64px;
  }

  .searchNav {
    background-color: #5babfb;
    border: none;
  }

  .van-icon {
    font-size: 32px;
    color: #fff;
  }
}

/deep/.tab-wrap {
  height: 100%;
  .van-tabs__wrap {
    padding-right: 66px;
    height: 82px;
    position: fixed;
    right: 0;
    left: 0;
    top: 98px;
    z-index: 1;
    .van-tabs__line {
      width: 31px;
      background-color: #3296fa;
      bottom: 10px;
    }
  }
  .van-tabs__nav--line {
    padding-bottom: unset;
  }

  .van-tab--active {
    color: #333333;
  }

  .van-tab {
    min-width: 190px;
    border-right: 1px solid #cccccc;
  }

  .hamburger-btn {
    width: 66px;
    height: 82px;
    line-height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    position: fixed;
    right: 0;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background: url('~@/assets/gradient-gray-line.png');
      background-size: contain;
    }
    .iconfont {
      font-size: 35px;
    }
  }
}
</style>
