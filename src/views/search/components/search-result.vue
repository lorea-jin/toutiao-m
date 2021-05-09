<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  props: {
    searchContent: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      list: [], // 存储请求获得来的结果
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perPage: 20
    }
  },
  created() {},
  methods: {
    async onLoad() {
      try {
        // 发请求
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchContent
        })
        // 数据推进数组
        this.list.push(...data.results)
        console.log(this.list)
        // loading为false,
        this.loading = false
        // 判断是否finished
        if (data.results) {
          // 没结束 继续
          this.page++
        } else {
          // 结束了
          this.finished = true
        }
      } catch (error) {
        // 关loading
        this.loading = false
        // 开启list错误提示
        this.error = true
        // 提示
        this.$toast('获取搜索结果失败，稍后重试')
      }
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
