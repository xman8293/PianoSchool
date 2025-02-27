<template>
  <view class="container">
    <!-- 创始人专区 -->
    <view class="founder-section card">
      <view class="section-title">
        <text class="title-text">创始团队</text>
        <text class="title-en">FOUNDERS</text>
      </view>
      <view class="founder-list">
        <view 
          class="founder-grid"
          v-for="founder in founderList" 
          :key="founder.id"
        >
          <view class="founder-image-wrapper">
            <image 
              :src="founder.avatar" 
              class="founder-image" 
              mode="aspectFill"
              style="border-radius: 12rpx"
              @tap="showImage(founder.avatar)"
            />
          </view>
          <view class="founder-info">
            <view class="founder-header">
              <text class="founder-name">{{founder.name}}</text>
              <view class="founder-position-tag">{{founder.position}}</view>
            </view>
            <view class="divider"></view>
            <text class="founder-brief">{{founder.brief}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 教师列表 -->
    <view class="teacher-section card">
      <view class="section-title">
        <text class="title-text">教师团队</text>
        <text class="title-en">TEACHERS</text>
      </view>
      <view class="teachers-grid">
        <view 
          class="teacher-card" 
          v-for="teacher in teacherList" 
          :key="teacher._id"
        >
          <view class="teacher-image-wrapper" @tap="showImage(teacher.avatar)">
            <image 
              :src="teacher.avatar" 
              class="teacher-image" 
              mode="aspectFit"
              style="border-radius: 16rpx"
            />
          </view>
          <view class="teacher-info">
            <view class="name-wrapper">
              <text class="teacher-name">{{teacher.name}}</text>
              <view class="teacher-subject-tag">{{teacher.subject}}</view>
            </view>
            <text class="teacher-brief">{{teacher.brief}}</text>
            <view class="teacher-expertise">
              <text v-for="(tag, index) in teacher.tags" :key="index" class="tag">
                #{{tag}}
              </text>
            </view>
          </view>
        </view>
      </view>
      <view v-if="loading" class="loading-text">加载中...</view>
    </view>

    <!-- 图片预览弹窗 -->
    <uni-popup ref="imagePopup" type="center" :is-mask-click="true" :mask-click="false" v-if="previewImage">
      <view class="image-preview" @tap="hideImage">
        <image 
          :src="previewImage" 
          mode="widthFix" 
          class="preview-image"
          @tap.stop=""
        />
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'

// 创始人数据（固定）
const founderList = ref([
  {
    id: 1,
    name: '李东霖',
    position: '校长',
    brief: '毕业院校：首都师范大学，20年教学经验',
    avatar: 'https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/teacher/donglin.jpg'
  },
  {
    id: 2,
    name: '李昭霖',
    position: '古筝教研组组长',
    brief: '毕业院校：中央音乐学院',
    avatar: 'https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/teacher/zhaolin.png'
  },
  {
    id: 3,
    name: '邓丽娟',
    position: '钢琴·声乐教研组组长',
    brief: '山西大同大学音乐系教授,35年教学经验',
    avatar: 'https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/teacher/deng.jpg'
  }
])

// 教师数据（动态）
const teacherList = ref([])
const loading = ref(true)

const { proxy } = getCurrentInstance()
const imagePopup = ref(null)
const previewImage = ref(null)

onMounted(async () => {
  try {
    const res = await uniCloud.callFunction({
      name: 'getTeachers',
      data: { page: 1, pageSize: 10 }
    })
    teacherList.value = res.result.data
  } catch (e) {
    console.error('获取教师数据失败:', e)
    uni.showToast({ title: '数据加载失败', icon: 'none' })
  } finally {
    loading.value = false
  }
})

const showImage = (url) => {
  previewImage.value = url
  if (proxy.$refs.imagePopup) {
    proxy.$refs.imagePopup.open()
  }
}

const hideImage = () => {
  if (proxy.$refs.imagePopup) {
    proxy.$refs.imagePopup.close()
  }
  previewImage.value = null
}
</script>

<style scoped>
/* 统一背景色 */
.container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20rpx 0;
}

.section-title {
  padding: 30rpx 40rpx;
  background: linear-gradient(to right, #2A3F54, #1A2B3C);
  margin-bottom: 30rpx;
  border-radius: 16rpx 16rpx 0 0;
}

.title-text {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #D4AF37;
  margin-bottom: 10rpx;
}

.title-en {
  display: block;
  font-size: 28rpx;
  color: rgba(255,255,255,0.8);
  letter-spacing: 2rpx;
}

/* 创始人样式 */
.founder-section {
  border: 4rpx solid #D4AF37;
  background: #fff;
  margin: 30rpx;
  position: relative;
  overflow: visible;
}

.founder-section::before {
  content: '';
  position: absolute;
  top: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 120rpx;
  height: 40rpx;
  background: #D4AF37;
  border-radius: 20rpx;
}

.founder-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  padding: 0 30rpx;
}

.founder-grid {
  background: #fff;
  border-radius: 28rpx;
  overflow: hidden;
  padding: 15rpx;
  box-shadow: 0 10rpx 30rpx rgba(42, 63, 84, 0.08);
  position: relative;
}

.founder-image-wrapper {
  width: 100%;
  height: 420rpx;
  padding: 15rpx;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 16rpx;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.founder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20rpx;
  transition: all 0.3s ease;
}

.founder-info {
  padding: 20rpx 25rpx;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(245,247,250,0.5));
  border-radius: 0 0 20rpx 20rpx;
}

.founder-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
  gap: 15rpx;
}

.founder-name {
  font-size: 44rpx;
  color: #2A3F54;
  font-weight: 700;
  white-space: nowrap;
}

.founder-position-tag {
  background: rgba(212,175,55,0.1);
  color: #D4AF37;
  font-size: 28rpx;
  padding: 8rpx 20rpx;
  border-radius: 8rpx;
  white-space: nowrap;
  flex-shrink: 0;
}

.divider {
  height: 1px;
  background: rgba(42,63,84,0.1);
  margin: 20rpx 0;
}

.founder-brief {
  font-size: 30rpx;
  color: rgba(42,63,84,0.8);
  line-height: 1.8;
  margin-top: 15rpx;
}

/* 教师列表样式 */
.teacher-section {
  background: #fff;
  margin: 0 30rpx 30rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 30rpx rgba(42,63,84,0.1);
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  padding: 20rpx;
}

.teacher-card {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(42,63,84,0.08);
  margin-bottom: 20rpx;
  transition: transform 0.3s ease;
}

.teacher-card:active {
  transform: scale(0.98);
}

.teacher-image-wrapper {
  width: 100%;
  height: 360rpx;
  padding: 15rpx;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 24rpx 24rpx 0 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.teacher-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20rpx 20rpx 0 0;
  object-position: center center;
  width: 95%;
  height: 95%;
  transition: all 0.3s ease;
}

.teacher-info {
  padding: 20rpx;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(245,247,250,0.5));
  border-radius: 0 0 20rpx 20rpx;
}

.name-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.teacher-name {
  font-size: 36rpx;
  color: #2A3F54;
  font-weight: 600;
  margin-right: 20rpx;
}

.teacher-subject-tag {
  background: #f0f2f5;
  color: #666;
  font-size: 26rpx;
  padding: 8rpx 20rpx;
  border-radius: 8rpx;
}

.teacher-brief {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.teacher-expertise {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}

.tag {
  background: #2A3F54;
  color: #fff;
  font-size: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 30rpx;
  line-height: 1.4;
}

.loading-text {
  text-align: center;
  padding: 20rpx;
  color: #999;
}

/* 图片预览样式 */
.image-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-width: 90vw;
  max-height: 80vh;
  transition: transform 0.3s ease;
}

/* 添加卡片悬停效果 */
.founder-grid:hover .founder-image,
.teacher-card:hover .teacher-image {
  transform: scale(1.02);
}
</style> 