import Vue from 'vue'
// 专门用来处理时间格式的工具
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用中文语言包
dayjs.locale('zh-cn')

dayjs.extend(relativeTime) // 配置使用处理相对时间的插件

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
