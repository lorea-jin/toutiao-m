<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <van-button
        slot="default"
        type="danger"
        size="small"
        round
        plain
        @click="goEdit"
      >{{isEditting ? '完成' :'编辑' }}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        :key="item.id"
        v-for="(item,index) in mychannel "
        class="channel-item my-channel-item"
        @click="myChannelClick(item,index)"
      >
        <div slot="text" :class="{active: activeIndex===index}">{{item.name}}</div>
        <van-icon v-if="isEditting&&item.name !=='推荐'" name="close" slot="icon" class="close" />
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" :border="false" class="channel-recommend"></van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        :key="item.id"
        v-for="item in recommendChannels"
        :text="item.name"
        class="channel-item recommend-item"
        @click="addToMyChannel(item)"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel.js'
import { setToken } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: {
    mychannel: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  components: {},
  data() {
    return {
      allchannels: [], // 所有频道数据存储
      isEditting: false // 是否点击了编辑
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    // 获取所有频道
    async getAllChannels() {
      try {
        const re = await getAllChannels()
        this.allchannels = re.data.channels
      } catch (error) {
        this.$toast('获取所有频道失败')
      }
    },

    // 点击编辑按钮触发的事件
    goEdit() {
      this.isEditting = !this.isEditting
    },

    // 点击了我的频道事件
    myChannelClick(item, index) {
      if (this.isEditting) {
        // 编辑模式，此处为删除功能
        // （1）如果是推荐频道，不允许删除
        if (item.name === '推荐') {
          return
        }

        // (2) 如果删除的索引 ＜目前激活的索引，那么让激活的索引-1
        if (index < this.activeIndex) {
          // 通知父组件 让父组件改激活索引
          this.$emit('changeActive', this.activeIndex - 1)
        }

        this.mychannel.splice(index, 1)

        // 本地或者服务器删除
        this.deleteUserChannel(item)
      } else {
        // 非编辑模式，为点击tab标签功能
        // 拿到当前点击的频道索引，通知父组件把active改成这个索引
        this.$emit('changeActive', index)
        this.$emit('closepopup')
      }
    },

    // 频道的删除事件
    async deleteUserChannel(item) {
      if (this.user) {
        // 服务器
        try {
          await deleteUserChannel(item.id)
        } catch (error) {
          console.log(error)
          this.$toast('删除失败')
        }
      } else {
        // 本地覆盖
        setToken('mylocalchannels', this.mychannel)
      }
    },

    // 添加频道的方法
    async addToMyChannel(item) {
      this.mychannel.push(item)

      if (this.user) {
        // 已登陆,调接口添加到服务器
        try {
          await addUserChannel([
            {
              id: item.id, // 频道id
              seq: this.mychannel.length
            }
          ])
        } catch (error) {
          console.log(error)
          this.$toast('添加频道失败')
        }
      } else {
        // 未登录,添加到本地

        setToken('mylocalchannels', this.mychannel)
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {
    recommendChannels() {
      return this.allchannels.filter(item => {
        return !this.mychannel.find(my => my.id === item.id)
      })
    },
    ...mapState(['user'])
  },
  filters: {}
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 85px 0;

  .van-button {
    width: 105px;
    height: 50px;
    font-size: 28px;
  }

  /deep/.channel-item {
    width: 160px;
    height: 84px;
    position: relative;
    .van-grid-item__content {
      background-color: #f4f5f6;
      color: #222;
      font-size: 28px;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
    }
  }

  .channel-recommend {
    margin-top: 70px;
  }
  /deep/.close {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 30px;
  }

  /deep/.van-grid-item__icon-wrapper {
    position: unset;
  }
}

.active {
  color: red !important;
}
</style>
