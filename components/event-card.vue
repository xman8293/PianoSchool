<template>
  <view class="event-card">
    <image v-if="image" class="cover" :src="image" mode="aspectFill" />
    <image v-else class="cover" src="/static/default-event.jpg" mode="aspectFill" />
    <view class="content">
      <text class="title">{{title || '未命名活动'}}</text>
      <view class="meta">
        <uni-icons type="calendar" size="16" color="#666"></uni-icons>
        <text class="time">{{time || '时间待定'}}</text>
      </view>
      <view class="meta">
        <uni-icons type="location" size="16" color="#666"></uni-icons>
        <text class="address">{{address || '地址待定'}}</text>
      </view>
      <text v-if="brief" class="brief">{{brief}}</text>
      <view class="status-tag" :class="status">
        {{statusText}}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    title: String,
    image: String,
    time: [String, Number],
    address: String,
    status: String,
    brief: String
  },
  computed: {
    statusText() {
      const map = {
        pending: '未开始',
        ongoing: '进行中',
        ended: '已结束'
      }
      return map[this.status] || ''
    }
  }
}
</script>

<style scoped>
.event-card {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.cover {
  width: 100%;
  height: 320rpx;
  object-fit: cover;
}

.content {
  padding: 24rpx;
  position: relative;
  min-height: 240rpx;
}

.title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2A3F54;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.4;
}

.meta {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #666;
}

.meta uni-icons {
  margin-right: 8rpx;
}

.brief {
  margin-top: 20rpx;
  font-size: 26rpx;
  color: #4a5568;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.status-tag {
  position: absolute;
  right: 24rpx;
  bottom: 30rpx;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
}

.status-tag.ongoing {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-tag.pending {
  background: #fff3e0;
  color: #ef6c00;
}

.status-tag.ended {
  background: #ffebee;
  color: #c62828;
}
</style> 