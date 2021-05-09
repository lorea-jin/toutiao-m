<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchContent"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" class="search-result" :searchContent="searchContent"></SearchResult>

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchContent"
      class="search-suggestion"
      :searchContent="searchContent"
    ></SearchSuggestion>

    <!-- 搜索记录 -->
    <SearchHistory
      v-else
      class="search-history"
      :History="History"
      @delsingle="delsingle($event)"
      @search="onSearch($event)"
      @delAll="History=[]"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import { setToken, getToken } from '@/utils/storage.js'
export default {
  name: 'SearchPage',
  props: {},
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory
  },
  data() {
    return {
      searchContent: '', // 搜索栏输入的内容
      isResultShow: false, // 是否显示搜索结果
      History: getToken('serach-histories') || [] // 搜索过的历史记录
    }
  },
  created() {},
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchContent = val

      // 排重，重复项放到第一位
      // （数组中查找val，找到了则去再数组中去除此val，并unshit到最前面）
      const index = this.History.indexOf(val)
      if (index !== -1) {
        // 找到一样的了

        this.History.splice(index, 1)
      }
      // 最新输入的插入最前面
      this.History.unshift(val)

      // 显示搜索结果
      this.isResultShow = true
    },

    onCancel() {
      this.$router.back()
      this.isResultShow = false
    },

    // 子组件通知父组件删除某个历史记录
    delsingle(index) {
      this.History.splice(index, 1)
    }
  },
  mounted() {},
  watch: {
    // 监视 历史搜索记录 的变化
    History(val) {
      setToken('serach-histories', val)
    }
  },
  computed: {},
  filters: {}
}
</script>

<style scoped lang='less'>
.search-container {
  padding-top: 92px;
}
/deep/.van-search {
  background-color: #3296fa;
  height: 92px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .van-search__action {
    color: #ffffff;
  }
}
</style>
