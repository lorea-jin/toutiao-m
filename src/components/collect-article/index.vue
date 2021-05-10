<template>
  <van-button :icon="collected ? 'star':'star-o'" @click="whetherCollect" :loading="loading" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  // props: ['collected', 'targetArticleId'],
  props: {
    // 是否被收藏的状态
    collected: {
      type: Boolean,
      required: true
    },
    targetArticleId: {
      type: [Number, String, Object],
      required: true
    }
  },

  components: {},
  data() {
    return {
      loading: false
    }
  },
  created() {},
  methods: {
    async whetherCollect() {
      this.loading = true
      try {
        if (this.collected) {
          // 已收藏 做取消收藏
          await deleteCollect(this.targetArticleId)
          this.$toast('取消收藏成功')
        } else {
          // 未收藏 做收藏的动作
          await addCollect(this.targetArticleId.toString())
          this.$toast('收藏成功')
        }
        // 通知父组件修改视图、
        this.$emit('reverseCollect')
      } catch (error) {
        console.log(error)
        this.$toast('操作失败，请稍后重试')
      }
      this.loading = false
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
}
</script>

<style scoped lang='less'>
/deep/.van-icon-star {
  color: pink !important;
}

.van-button {
  border: unset;
}
</style>
