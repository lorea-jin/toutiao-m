<template>
  <div class="follow-user">
    <van-button
      v-if="articleInfo.is_followed"
      class="follow-btn"
      round
      size="small"
      :loading="isFollowLoading"
      @click="whetherfollow"
    >已关注</van-button>
    <van-button
      v-else
      class="follow-btn"
      :loading="isFollowLoading"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="whetherfollow"
    >关注</van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'FollowUser',
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    return {
      isFollowLoading: false // 是否加载中
    }
  },
  created() {},
  methods: {
    // 关注按钮
    async whetherfollow() {
      this.isFollowLoading = true // 开启按钮加载中
      try {
        if (this.articleInfo.is_followed) {
          // 已关注 做取关的动作
          await deleteFollow(this.articleInfo.aut_id)
        } else {
          // 未关注，做关注的动作
          await addFollow(this.articleInfo.aut_id)
        }
        // this.articleInfo.is_followed = !this.articleInfo.is_followed
        // 虽然引用值对象可以修改成功，也不会报错 但是不符合vue单向流的思想
        // 所以还是要通过父组件
        this.$emit('reversfollowed')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false // 关闭按钮加载状态
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
}
</script>

<style scoped lang='less'>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
