<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articleInfo.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleInfo.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="articleInfo.aut_photo" />
          <div slot="title" class="user-name">{{articleInfo.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleInfo.pubdate | relativeTime}}</div>

          <!-- 放入关注用户组件 -->
          <FollowUser
            :articleInfo="articleInfo"
            @reversfollowed="articleInfo.is_followed=!articleInfo.is_followed"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleInfo.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus===404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
      <van-icon name="comment-o" badge="123" color="#777" />
      <CollectArticle
        :collected="articleInfo.is_collected"
        :targetArticleId="articleInfo.art_id"
        @reverseCollect="articleInfo.is_collected=!articleInfo.is_collected"
      ></CollectArticle>
      <LikeArticle
        :like="articleInfo.attitude"
        :targetArticleId="articleInfo.art_id"
        @reverseLike="articleInfo.attitude=$event"
      ></LikeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/followuser'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      articleInfo: {
        is_collected: false,
        art_id: 1,
        attitude: -1
      }, // 请求回来的文章详情
      loading: true, // 是否在加载中
      errorStatus: 0 // 默认错误类型是0
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    // 请求文章的api事件
    async loadArticle() {
      try {
        const { data } = await getArticleById(this.articleId)
        // 因为dom中数据更新渲染时异步的 所以这里的赋值不会马上影响视图
        // 即数据驱动视图不是立即的
        this.articleInfo = data

        // 拿到此div实例下所有图片dom节点
        setTimeout(() => {
          this.getPreview() // 可以拿到
        }, 0)

        this.loading = false // 这个是文章的加载状态
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
        }
      }
    },

    // 预览图片的事件
    getPreview() {
      const dombox = this.$refs['article-content']
      const img = dombox.querySelectorAll('img')
      const imglink = []

      img.forEach((item, index) => {
        imglink.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images: imglink,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
