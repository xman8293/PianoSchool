<template>
  <view class="page-container">
    <view class="event-list">
      <view v-if="eventList.length === 0 && !loading" class="empty-tips">
        <text class="empty-text">暂无活动数据</text>
      </view>

      <view 
        v-for="(item, index) in eventList" 
        :key="item.id"
        class="event-card"
        @click="navigateToDetail(item.id)"
      >
        <image 
          :src="item.cover" 
          mode="aspectFill" 
          class="event-image"
        />
        <view class="event-content">
          <view class="event-header">
            <text class="event-title">{{ item.title }}</text>
            <text 
              :class="['event-status', getStatusClass(item.status)]"
              v-if="item.status !== '进行中'"
            >
              {{ getStatusText(item.status) }}
            </text>
          </view>
          <view class="event-meta">
            <uni-icons type="calendar" size="16" color="#666"/>
            <text class="meta-text">{{ item.time }}</text>
            <uni-icons type="location" size="16" color="#666" style="margin-left: 20rpx"/>
            <text class="meta-text">{{ item.location }}</text>
          </view>
          <text class="event-brief">{{ item.brief }}</text>
        </view>
      </view>

      <!-- 加载状态提示 -->
      <view class="loading-text">
        <text v-if="loading">加载中...</text>        
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'

// 数据状态
const eventList = ref([])
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const loading = ref(false)
const noMore = ref(false)
const banners = ref([
 
])

// 获取活动数据
const fetchEvents = async (page = 1) => {
  try {
    loading.value = true
    const res = await Promise.race([
      uniCloud.callFunction({
        name: 'getEvents',
        data: { page, pageSize: 10 },
        timeout: 10000
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('请求超时')), 10000)
      )
    ])
    
    if (res.result.code === 200) {
      eventList.value = page === 1 
        ? res.result.data.list 
        : [...eventList.value, ...res.result.data.list]
      total.value = res.result.data.total
      noMore.value = !res.result.data.hasMore
    } else {
      throw new Error(res.result.message)
    }

  
  } catch (error) {
    uni.showToast({
      title: error.errMsg || error.message,
      icon: 'none',
      duration: 3000
    })
    console.error('完整错误信息:', {
      code: error.errCode,
      message: error.errMsg,
      detail: error
    })
  } finally {
    loading.value = false
  }
}

// 状态样式
const getStatusText = (status) => {
	switch (status) {
		case 'ongoing':
			return '进行中'
		case 'upcoming':
			return '即将开始'
		case 'ended':
			return '已结束'
		default:
			return ''
	}
}
const getStatusClass = (status) => {
	switch (status) {
		case 'ongoing':
			return 'ongoing'
		case 'upcoming':
			return 'upcoming'
		case 'ended':
			return 'ended'
		default:
			return ''
	}
}

// 页面生命周期
onMounted(() => {
  console.log(uni.getSystemInfoSync().SDKVersion) // 获取小程序基础库版本
  console.log(__wxConfig.envVersion) // 获取环境版本
  fetchEvents()
})

// 上拉加载更多
onReachBottom(() => {
  if (!noMore.value) {
    currentPage.value += 1
    fetchEvents(currentPage.value)
  }
})

// 下拉刷新
onPullDownRefresh(() => {
  currentPage.value = 1
  uni.removeStorageSync('eventCache')
  fetchEvents().finally(() => {
    uni.stopPullDownRefresh()
    uni.showToast({ title: '刷新成功', icon: 'success' })
  })
})

const loadMoreEvents = async () => {
  loading.value = true
  try {
    currentPage.value++
    const res = await uniCloud.callFunction({
      name: 'getEvents',
      data: { page: currentPage.value }
    })
    
    if (res.result.data.length === 0) {
      noMore.value = true
    }
  } finally {
    loading.value = false
  }
}

// 添加错误追踪
if (typeof console.trace === 'function') {
  console.trace('当前堆栈信息')
} else {
  console.log('当前环境不支持console.trace')
}
</script>

<style scoped>
.page-container {
  background: #f5f5f5;
  min-height: 100vh;
}

.event-swiper {
  height: 300rpx;
  background: #fff;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

.event-list {
  padding: 20rpx;
}

.event-list.loading {
  opacity: 0.6;
}

.event-card {
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.event-image {
  width: 100%;
  height: 360rpx;
}

.event-content {
  padding: 20rpx;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.event-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2A3F54;
  flex: 1;
  margin-right: 20rpx;
}

.event-status {
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.event-status.ongoing {
  background: #e6f3ff;
  color: #007BFF;
}

.event-status.ended {
  background: #f5f5f5;
  color: #999;
}

.event-meta {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
  color: #666;
}

.meta-text {
  margin-left: 8rpx;
  font-size: 24rpx;
}

.event-brief {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.loading-text {
  text-align: center;
  padding: 30rpx;
  color: #999;
}

.loading-text .no-more {
  display: block;
  font-size: 24rpx;
}

.empty-tips {
  text-align: center;
  padding: 40rpx;
}
.empty-text {
  display: block;
  color: #999;
  font-size: 28rpx;
  margin-top: 20rpx;
}

.event-info::after {
  content: '';
  display: block;
  width: 100%;
  height: 1rpx;
  background-color: #eeeeee;
  margin: 20rpx 0;
}
</style> 