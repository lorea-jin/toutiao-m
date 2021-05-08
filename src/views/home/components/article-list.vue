<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="successtext">
      <!-- list列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- 放入文章列表的item组件 -->
        <ArticleItem v-for="(item,index) in list" :key="index" :article="item"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import ArticleItem from '../components/article-item'
export default {
  name: 'ArticleList',
  props: {
    // 包括 频道ID和频道名字
    channelinfo: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      isRefreshLoading: false, // 下拉刷新是否还在加载中
      list: [], // 请求拿回来的文章列表数据存储
      loading: false,
      finished: false,
      timestamp: null, // 请求的页码
      error: false, // 是否加载失败
      successtext: '' // 下拉更新成功的提示文字
    }
  },
  created() {},
  methods: {
    async onLoad() {
      // // (1)发请求拿数据
      try {
        const { data } = await getArticle({
          channel_id: this.channelinfo.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // if (Math.random() > 0.5) {
        //   JSON.parse('SJSJSJSJ')
        // }

        const { results } = data
        // (2)数据推入list里存储
        this.list.push(...results)

        // (3)让loading为false  代表这一次的加载状态 这一次请求结束
        this.loading = false

        // (4)判断是否请求全部finish  若已结束设为finished为true 之后不用再触发加载了
        if (results.length) {
          // 还有数据 继续请求
          this.timestamp = data.pre_timestamp
        } else {
          // 长度为0 finished为true
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.loading = false
        this.error = true // 开启错误提示
        this.$toast('加载失败，请稍候重试')
      }
    },

    // 下拉刷新事件
    async onRefresh() {
      try {
        // 发请求 拿最新数据
        const { data } = await getArticle({
          channel_id: this.channelinfo.id,
          timestamp: Date.now(),
          with_top: 1
        })

        // 将响应数据推到数组头部 unshift
        const { results } = data
        this.list.unshift(...results)

        // 关闭下拉刷新的loading状态
        this.isRefreshLoading = false

        // 提示成功
        this.successtext = `刷新成功，已更新${results.length}条数据`
      } catch (error) {}
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
}
</script>

<style scoped lang='less'>
</style>
