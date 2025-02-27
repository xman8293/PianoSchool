<template>
  <view class="student-list-container">
    <!-- 标题区域 -->
    <view class="section-header">
      <text class="title">优秀学员</text>
    </view>

    <!-- 学员列表 -->
    <view class="student-grid">
      <view 
        v-for="(item, index) in studentList" 
        :key="index"
        class="student-card"
      >
        <view class="avatar-wrapper">
          <image 
            :src="item.avatar || '/static/default-avatar.png'" 
            mode="aspectFill" 
            class="avatar"
          />
          <view class="honor-tag">🎖️ {{ item.honor || '年度优秀学员' }}</view>
        </view>
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <view class="intro-wrapper">
            <text 
              class="intro" 
              @touchstart="showTooltip($event, item.intro)" 
              @touchend="hideTooltip"
            >
              {{ item.intro }}
            </text>
          </view>
          <text v-if="item.achievement" class="achievement">🏆 {{ item.achievement }}</text>
        </view>
      </view>
    </view>
    <view v-if="showPopup" class="tooltip" :style="tooltipPosition">
      {{ currentIntro }}
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const studentList = ref([])
const showPopup = ref(false)
const currentIntro = ref('')
const tooltipPosition = ref({ left: '0', top: '0' })

const showTooltip = (e, intro) => {
  const query = uni.createSelectorQuery().in(this)
  query.select('.student-list-container').boundingClientRect()
  query.exec(res => {
    const container = res[0]
    const { pageX, pageY } = e.touches[0]
    tooltipPosition.value = {
      left: `${pageX - container.left - 100}px`,
      top: `${pageY - container.top - 60}px`
    }
    currentIntro.value = intro
    showPopup.value = true
  })
}

const hideTooltip = () => {
  showPopup.value = false
}

const loadData = async () => {
  try {
    const res = await uniCloud.callFunction({
      name: 'getStudents',
      data: { 
        pageSize: 20,
        orderBy: 'sort'
      }
    })
    studentList.value = res.result.data.list.map(item => ({
      ...item,
      achievement: item.achievement || '2025年度优秀学员'
    }))
  } catch (e) {
    console.error('加载失败:', e)
    uni.showToast({ title: '数据加载失败', icon: 'none' })
  }
}

loadData()
</script>

<style scoped>
.student-list-container {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 30rpx;
}

.section-header {
  background: linear-gradient(135deg, #2A3F54, #3A5F7A);
  border-radius: 16rpx;
  margin: 30rpx;
  padding: 40rpx 0;
  box-shadow: 0 8rpx 24rpx rgba(42,63,84,0.15);
}

.title {
  font-size: 40rpx;
  font-weight: 600;
  color: #FFFFFF;
  text-align: center;
  display: block;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  padding: 0 30rpx;
}

.student-card {
  background: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.student-card:active {
  transform: scale(0.98);
}

.avatar-wrapper {
  position: relative;
  height: 360rpx;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.honor-tag {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #2A3F54, #3A5F7A);
  color: #FFFFFF;
  padding: 8rpx 30rpx;
  border-radius: 40rpx;
  font-size: 24rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  padding: 24rpx;
  background: #fff;
}

.name {
  font-size: 32rpx;
  font-weight: 600;
  color: #2A3F54;
  display: block;
  margin-bottom: 12rpx;
}

.intro-wrapper {
  position: relative;
}

.intro {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8rpx;
  transition: all 0.3s;
}

.achievement {
  display: block;
  font-size: 24rpx;
  color: #007BFF;
  font-weight: 500;
}

/* 新增提示框样式 */
.tooltip {
  position: fixed;
  background: rgba(0,0,0,0.9);
  color: #fff;
  padding: 20rpx 30rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
  line-height: 1.4;
  max-width: 500rpx;
  z-index: 999;
  pointer-events: none;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10rpx); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 