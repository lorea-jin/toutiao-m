<template>
  <van-button :icon="like===1 ? 'good-job':'good-job-o'" @click="whetherLike" :loading="loading" />
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  props: {
    like: {
      type: Number,
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
    async whetherLike() {
      this.loading = true
      try {
        let status = -1
        if (this.like === 1) {
          // 已喜欢，取消赞
          await deleteLike(this.targetArticleId)

          this.$toast('已取消')
        } else {
          // 没喜欢，点赞
          await addLike(this.targetArticleId.toString())
          status = 1
          this.$toast('点赞成功')
        }
        this.$emit('reverseLike', status)
      } catch (error) {
        console.log(error)
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
.van-button {
  border: unset;
}

.van-icon-good-job {
  color: red;
}
</style>
