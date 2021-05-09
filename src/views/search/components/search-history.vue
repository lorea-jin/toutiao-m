<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <template v-if="isDeleteShow">
        <span @click="delAll">全部删除</span>
        <span @click="isDeleteShow=false">完成</span>
      </template>
      <van-icon v-else name="delete-o" @click="isDeleteShow=true" />
    </van-cell>

    <van-cell
      :key="index"
      v-for="(item,index) in History"
      :title="item"
      @click="delorClick(item,index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    // 搜索历史记录
    History: {
      type: Array
    }
  },
  components: {},
  data() {
    return {
      isDeleteShow: false // 是否点击了垃圾桶删除
    }
  },
  created() {},
  methods: {
    delorClick(item, index) {
      if (this.isDeleteShow) {
        // 通知父组件删除
        this.$emit('delsingle', index)
      } else {
        // 通知父组件搜索
        this.$emit('search', item)
      }
    },

    // 点击了全部删除
    delAll() {
      this.$emit('delAll')
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
}
</script>

<style scoped lang='less'>
.search-history span:nth-of-type(1) {
  margin-right: 5px;
}
</style>
