<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="user-card card">
      <image :src="userInfo.avatar" class="user-avatar" mode="aspectFill"/>
      <view class="user-info">
        <text class="user-name primary-color">{{userInfo.name}}</text>
        <text class="user-phone">{{userInfo.phone}}</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-list card">
      <view class="menu-item" v-for="menu in menuList" :key="menu.id" @tap="handleMenuClick(menu)">
        <view class="menu-icon" :class="menu.icon"></view>
        <text class="menu-text">{{menu.text}}</text>
        <text class="menu-arrow">></text>
      </view>
    </view>

    <!-- 我的预约 -->
    <view class="my-bookings card">
      <view class="section-title primary-color">我的预约</view>
      <view class="booking-list">
        <view class="booking-item" v-for="booking in bookingList" :key="booking.id">
          <view class="booking-info">
            <text class="booking-teacher">{{booking.teacherName}}</text>
            <text class="booking-time">{{booking.time}}</text>
          </view>
          <text class="booking-status" :class="booking.status">{{booking.statusText}}</text>
        </view>
      </view>
    </view>

    <!-- 我的活动 -->
    <view class="my-events card">
      <view class="section-title primary-color">我的活动</view>
      <view class="event-list">
        <view class="event-item" v-for="event in eventList" :key="event.id">
          <image :src="event.image" class="event-image" mode="aspectFill"/>
          <view class="event-info">
            <text class="event-title">{{event.title}}</text>
            <text class="event-time">{{event.time}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  avatar: '/static/images/avatar.jpg',
  name: '张三',
  phone: '138****8888'
})

const menuList = ref([
  { id: 1, text: '个人资料', icon: 'icon-profile' },
  { id: 2, text: '我的收藏', icon: 'icon-favorite' },
  { id: 3, text: '联系客服', icon: 'icon-service' },
  { id: 4, text: '设置', icon: 'icon-setting' }
])

const bookingList = ref([
  {
    id: 1,
    teacherName: '王老师',
    time: '2024-07-15 14:00',
    status: 'pending',
    statusText: '待确认'
  },
  {
    id: 2,
    teacherName: '李老师',
    time: '2024-07-20 15:00',
    status: 'confirmed',
    statusText: '已确认'
  }
])

const eventList = ref([
  {
    id: 1,
    title: '夏季音乐会',
    time: '2024-07-15 19:00',
    image: '/static/images/events/event1.jpg'
  }
])

const handleMenuClick = (menu) => {
  // 处理菜单点击...
  uni.navigateTo({
    url: `/pages/${menu.id === 1 ? 'profile-edit' : menu.id === 2 ? 'favorites' : menu.id === 3 ? 'service' : 'settings'}/index`
  })
}
</script>

<style scoped>
.container {
  padding: 20rpx;
  background: #f8f8f8;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 30rpx;
}

.user-name {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.user-phone {
  font-size: 28rpx;
  color: #999;
}

.menu-list {
  margin-top: 30rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

.menu-text {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.menu-arrow {
  color: #999;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.booking-teacher {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.booking-time {
  font-size: 24rpx;
  color: #999;
}

.booking-status {
  font-size: 24rpx;
}

.booking-status.pending {
  color: #D4AF37;
}

.booking-status.confirmed {
  color: #2A3F54;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
}

.event-item {
  width: 48%;
  margin-bottom: 20rpx;
  margin-right: 2%;
}

.event-image {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
  margin-bottom: 10rpx;
}

.event-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 5rpx;
}

.event-time {
  font-size: 24rpx;
  color: #999;
}
</style> 