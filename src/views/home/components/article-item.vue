<template>
  <!-- 此组件是文章list列表中每一个文章item -->
  <!-- :to="'/article/' +article.art_id" -->

  <van-cell class="article-item" :to="{name:'article',params:{articleId:article.art_id}}">
    <div slot="title" class="article-title van-multi-ellipsis--l2">{{article.title}}</div>

    <div slot="label">
      <!-- 如果有三张 -->
      <div class="imglayout" v-if="article.cover.images.length==3">
        <div :key="index" v-for="(img,index) in article.cover.images" class="img-item">
          <van-image :src="img" />
        </div>
      </div>

      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>

    <!-- 如果只有一张 -->
    <van-image
      v-if="article.cover.images.length==1"
      slot="default"
      :src="article.cover.images[0]"
      fit="cover"
      class="right-cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    // 点击每个文章触发的函数--为了浏览文章
    // clickItem() {
    //   console.log()
    // }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
}
</script>

<style scoped lang='less'>
.article-item {
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .label-info-wrap {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }
}
.article-title {
  font-size: 32px;
  color: #3a3a3a;
}

.right-cover {
  width: 232px;
  height: 146px;
}
.imglayout {
  display: flex;

  .img-item {
    flex: 1;
    width: 232px;
    height: 146px;
    &:not(:last-child) {
      margin-right: 4px;
    }

    .van-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
