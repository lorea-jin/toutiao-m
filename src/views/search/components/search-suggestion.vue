<template>
  <div class="search-suggestion">
    <van-cell :key="index" v-for="(item,index) in suggestion" icon="search">
      <div slot="title" v-html="highlightText(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { searchsuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchContent: {
      type: String
    }
  },
  components: {},
  data() {
    return {
      suggestion: [] // 请求回来的联想建议存储
    }
  },
  created() {},
  methods: {
    // 请求联想建议的事件
    async getsuggestion(value) {
      try {
        const { data } = await searchsuggestion({ q: value })
        this.suggestion = data.options
      } catch (error) {
        console.log(error)
      }
    },

    // 处理高亮的事件
    highlightText(text) {
      // text整个联想建议的句子
      const afterhighlight = `<span class="highlight">${this.searchContent}</span>`
      const reg = new RegExp(this.searchContent, 'gi')
      return text.replace(reg, afterhighlight)
    }
  },
  mounted() {},
  watch: {
    // 监视输入框内容的变化
    searchContent: {
      // handle(value) {},
      // handle:function(){}
      handler: debounce(function(value) {
        // 发请求拿建议
        this.getsuggestion(value)
      }, 1000),
      immediate: true // 第一次输入刚渲染出来的时候就给我监听
    }
  },
  computed: {},
  filters: {}
}
</script>

<style scoped lang='less'>
/deep/.highlight {
  color: red;
}
</style>
