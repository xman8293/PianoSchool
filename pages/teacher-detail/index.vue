<template>
  <view class="container">
    <view class="teacher-header">
      <image :src="teacherInfo.avatar" class="teacher-banner" mode="aspectFill"/>
      <view class="teacher-basic-info">
        <text class="teacher-name primary-color">{{teacherInfo.name}}</text>
        <text class="teacher-subject">{{teacherInfo.subject}}</text>
      </view>
    </view>

    <view class="teacher-detail card">
      <view class="section">
        <view class="section-title primary-color">教学经历</view>
        <view class="section-content">{{teacherInfo.experience}}</view>
      </view>
      
      <view class="section">
        <view class="section-title primary-color">教学特点</view>
        <view class="section-content">{{teacherInfo.features}}</view>
      </view>
    </view>

    <view class="book-section card">
      <button class="btn-primary" @tap="showBookingForm">预约试听课</button>
    </view>

    <!-- 预约表单弹窗 -->
    <uni-popup ref="popup" type="center">
      <view class="booking-form">
        <view class="form-title primary-color">预约试听课</view>
        <view class="form-item">
          <input v-model="bookingForm.name" placeholder="请输入姓名"/>
        </view>
        <view class="form-item">
          <input v-model="bookingForm.phone" placeholder="请输入手机号"/>
        </view>
        <view class="form-item">
          <picker mode="date" :value="bookingForm.date" @change="onDateChange">
            <view>{{bookingForm.date || '请选择预约日期'}}</view>
          </picker>
        </view>
        <view class="form-buttons">
          <button class="btn-secondary" @tap="closeBookingForm">取消</button>
          <button class="btn-primary" @tap="submitBooking">确认预约</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const popup = ref(null)
const teacherInfo = ref({
  id: 1,
  name: '王老师',
  subject: '钢琴',
  avatar: '/static/images/teachers/teacher1.jpg',
  experience: '毕业于中央音乐学院钢琴系，从教15年。曾获得多项国际钢琴比赛奖项...',
  features: '因材施教，注重基本功培养，针对不同年龄段学员制定个性化教学计划...'
})

const bookingForm = ref({
  name: '',
  phone: '',
  date: ''
})

const showBookingForm = () => {
  popup.value.open()
}

const closeBookingForm = () => {
  popup.value.close()
}

const onDateChange = (e) => {
  bookingForm.value.date = e.detail.value
}

const submitBooking = () => {
  // 这里添加表单验证和提交逻辑
  uni.showToast({
    title: '预约成功',
    icon: 'success'
  })
  closeBookingForm()
}

onMounted(() => {
  // 这里可以根据路由参数获取教师详情
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = currentPage.options.id
  // 根据id获取教师信息...
})
</script>

<style scoped>
.teacher-header {
  position: relative;
  width: 100%;
}

.teacher-banner {
  width: 100%;
  height: 400rpx;
}

.teacher-basic-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: #fff;
}

.teacher-name {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.teacher-subject {
  font-size: 28rpx;
}

.section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.section-content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.book-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
}

.booking-form {
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  width: 600rpx;
}

.form-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.form-item {
  margin-bottom: 20rpx;
  padding: 20rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;
}

.form-buttons button {
  width: 45%;
}
</style> 