<template>
  <view class="cert-container">
    <!-- 头部 -->
    <view class="cert-header">
      <text class="header-title">证书展示</text>
    </view>
    
    <!-- 证书网格 -->
    <view class="cert-grid">
      <view 
        v-for="(item, index) in certList" 
        :key="index"
        class="cert-card"
      >
        <view class="image-wrapper">
          <image 
            :src="item.image" 
            mode="aspectFill" 
            class="cert-image"
          />
        </view>
        <text class="cert-name">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const certList = ref([])

const loadCertificates = async () => {
  try {
    const res = await uniCloud.callFunction({
      name: 'getCertificates',
      data: { pageSize: 6 }
    })
    console.log('证书数据:', res)
    certList.value = res.result.data.list
  } catch (e) {
    console.error('加载失败:', e)
    uni.showToast({ title: '数据加载失败', icon: 'none' })
  }
}

loadCertificates()
</script>

<style scoped>
.cert-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 30rpx;
}

.cert-header {
  background: linear-gradient(135deg, #2A3F54, #3A5F7A);
  border-radius: 16rpx;
  margin: 30rpx;
  padding: 40rpx 0;
  box-shadow: 0 8rpx 24rpx rgba(42,63,84,0.15);
}

.header-title {
  font-size: 40rpx;
  font-weight: 600;
  color: #FFFFFF;
  text-align: center;
  display: block;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx;
  padding: 0 30rpx;
}

.cert-card {
  background: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.cert-card:active {
  transform: scale(0.98);
}

.image-wrapper {
  width: 100%;
  height: 260rpx;
  overflow: hidden;
  position: relative;
}

.cert-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cert-name {
  display: block;
  padding: 24rpx;
  font-size: 28rpx;
  color: #2A3F54;
  text-align: center;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style> 