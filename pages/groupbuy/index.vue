<template>
  <view class="groupbuy-container">
    <!-- 新增下拉刷新 -->
    <scroll-view 
      scroll-y 
      class="scroll-view"
      @refresherrefresh="onRefresh"
      :refresher-enabled="true"
      @scrolltolower="loadMore"
    >
      <!-- 新增加载状态 -->
      <view v-if="loading" class="loading-wrapper">
        <uni-load-more status="loading"></uni-load-more>
      </view>

      <!-- 顶部标题 -->
      <view class="section-header">
        <text class="title">限时团购</text>
        <text class="subtitle">超值优惠 火热进行中</text>
      </view>

      <!-- 团购列表 -->
      <view class="group-list">
        <view 
          v-for="(item, index) in groupList" 
          :key="index"
          class="group-item"
          @click="handleJump(item)"
          hover-class="hover-effect"
        >
          <!-- 新增角标 -->
          <view class="corner-tag">限时特惠</view>
          <image 
            :src="item.image" 
            mode="aspectFill" 
            class="product-image"
            lazy-load
          />
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <view class="price-wrapper">
              <text class="current-price">
                <text class="currency">¥</text>
                {{ formatPrice(item.currentPrice) }}
              </text>
              <text class="original-price">¥{{ item.originalPrice }}</text>
            </view>
            <view class="notice">
              <text class="notice-title">团购须知：</text>
              <text class="notice-content">{{ truncateNotice(item.notice, 40) }}</text>
            </view>
            <view class="action-btn">
              立即参团             
            </view>
          </view>
        </view>
      </view>

      <!-- 空数据提示 -->
      <view v-if="!loading && groupList.length === 0" class="empty-tip">
        <image src="/static/empty.png" class="empty-img" />
        <text class="empty-text">暂无优惠活动，敬请期待</text>
      </view>

      <!-- 加载更多 -->
      <uni-load-more 
        :status="loadStatus" 
        :content-text="{
          contentdown: '上拉加载更多',
          contentrefresh: '正在加载...',
          contentnomore: '没有更多了'
        }"
      />
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  formatPrice,
  truncateText,
  formatTime 
} from '@/utils/common.js'


const groupList = ref([])
const loading = ref(true)
const error = ref(false)
const currentPage = ref(1)
const total = ref(0)
const loadStatus = ref('more')


const loadGroupbuyList = async (page = 1, isRefresh = false) => {


  if (loadStatus.value === 'noMore') return
  loadStatus.value = 'loading'
  uni.showLoading({ title: '加载中', mask: true })

  try {
    const res = await Promise.race([
      uniCloud.callFunction({
        name: 'getGroupbuyList',
        data: {
          page: page,
          pageSize: 10
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('请求超时')), 10000)
      )
    ])
    
    if (res.result.code === 200) {
      total.value = res.result.data.total
      groupList.value = isRefresh 
        ? res.result.data.list 
        : [...groupList.value, ...res.result.data.list]
      
      loadStatus.value = res.result.data.list.length < 10 ? 'noMore' : 'more'
      loading.value = false
    } else {
      throw new Error(res.result.msg)
    }
  } catch (e) {
    loading.value = false
    error.value = true
    console.error('加载团购数据失败:', e)
    uni.showToast({
      title: e.message.includes('超时') ? '请求超时，请重试' : '加载失败',
      icon: 'none'
    })
  } finally {
    uni.hideLoading()
    loading.value = false
  }
}

const onRefresh = async () => {
  currentPage.value = 1
  await loadGroupbuyList(1, true)
  uni.stopPullDownRefresh()
}

const loadMore = () => {
  if (loadStatus.value !== 'more') return
  currentPage.value++
  loadGroupbuyList(currentPage.value)
}

const truncateNotice = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

onMounted(() => {
  loadGroupbuyList()
})

const handleJump = (item) => {
  uni.navigateToMiniProgram({
    appId: "wxde8ac0a21135c07d",
    path: 'gc/pages/deal/dealdetail/dealdetail?dealid=828645933&shopid=1502583614', 
    success(res) {
      console.log('跳转成功', res)
    },
    fail(err) {
      console.error('跳转失败', err)
      uni.showToast({ title: '跳转失败，请稍后重试', icon: 'none' })
    }
  })
}
</script>

<style scoped>
.groupbuy-container {
  padding: 30rpx;
  background: #f5f7fa;
  min-height: 100vh;
}

.section-header {
  padding: 40rpx 0;
  text-align: center;
}

.title {
  font-size: 40rpx;
  font-weight: 600;
  color: #2A3F54;
  display: block;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  margin-top: 10rpx;
  display: block;
}

.group-list {
  display: grid;
  gap: 30rpx;
}

.group-item {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-image {
  width: 100%;
  height: 400rpx;
  border-radius: 24rpx 24rpx 0 0;
}

.info {
  padding: 30rpx;
}

.name {
  font-size: 32rpx;
  color: #2A3F54;
  font-weight: 500;
  line-height: 1.4;
}

.price-wrapper {
  margin: 20rpx 0;
  display: flex;
  align-items: baseline;
}

.current-price {
  font-size: 40rpx;
  color: #FF4D4F;
  font-weight: 600;
  margin-right: 20rpx;
}

.original-price {
  font-size: 28rpx;
  color: #999;
  text-decoration: line-through;
}

.notice {
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 20rpx;
  margin: 20rpx 0;
}

.notice-title {
  color: #2A3F54;
  font-weight: 500;
}

.notice-content {
  color: #666;
  font-size: 26rpx;
  line-height: 1.4;
}

.action-btn {
  background: linear-gradient(135deg, #2A3F54, #3A5F7A);
  color: #fff;
  text-align: center;
  padding: 20rpx;
  border-radius: 12rpx;
  font-size: 30rpx;
  margin-top: 20rpx;
  position: relative;
  overflow: hidden;
}

.action-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255,255,255,0.1);
  transform: rotate(45deg);
  transition: all 0.5s;
}

.loading-wrapper {
  text-align: center;
  padding: 20rpx;
}

.corner-tag {
  position: absolute;
  right: -20rpx;
  top: 20rpx;
  background: #FF4D4F;
  color: #fff;
  padding: 8rpx 30rpx;
  transform: rotate(45deg);
  font-size: 24rpx;
  z-index: 2;
}

.currency {
  font-size: 28rpx;
  margin-right: 4rpx;
}

.remaining {
  font-size: 24rpx;
  margin-left: 15rpx;
  opacity: 0.8;
}

.empty-tip {
  text-align: center;
  padding: 100rpx 0;
}

.empty-img {
  width: 300rpx;
  height: 300rpx;
  opacity: 0.5;
}

.empty-text {
  display: block;
  color: #999;
  margin-top: 20rpx;
}

.scroll-view {
  height: 100vh;
  box-sizing: border-box;
}

.hover-effect {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 30rpx rgba(0,0,0,0.15);
}
</style> 